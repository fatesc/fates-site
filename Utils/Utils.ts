import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Command } from "./types";

export async function getCommands(axios: NuxtAxiosInstance): Promise<Command[]> {
  const descregx = /^((?<usage>[^\\\n]+)(?:\\n))?(?<desc>.*)$/gmi
  const parseTable = (t: string) => t?.replaceAll?.(/{(.*?)}/gmi, "[$1]").split(/,\ */gmi).map((v, idx, arr) => arr.length == 1 ? v.slice(2, -2) : idx == 0 ? v.slice(2, -1) : idx == arr.length - 1 ? v.slice(1, -2) : v.slice(1, -1))
  const parseDesc = (t: string) => {
    const b: any = Array.from(t.matchAll(descregx) ?? [])[0].groups
    return {
      usage: b.usage,
      description: b.desc
    }
  }

  const regx = /AddCommand\("(?<cmdName>\S+)",\ *(?<alias>{.*?}),\ *"(?<desc>.*?)"/gmi
  const data = Array.from((await axios.$get("https://raw.githubusercontent.com/fatesc/fates-admin/main/main.lua") as string)?.matchAll(regx))
  return data.map((v: any) => ({
    name: v.groups.cmdName,
    ...parseDesc(v.groups.desc),
    aliases: parseTable(v.groups.alias)
  })).sort((a, b) => a.name.localeCompare(b.name));
}