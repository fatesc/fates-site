import { Command } from "./types";

const descregx = /^((?<usage>[^\\\n]+)(?:\\n))?(?<desc>.*)$/gmi
const parseTable = (t: string) => t?.replaceAll?.(/{(.*?)}/gmi, "[$1]").split(/,\ */gmi).map((v, idx, arr) => arr.length == 1 ? v.slice(2, -2) : idx == 0 ? v.slice(2, -1) : idx == arr.length - 1 ? v.slice(1, -2) : v.slice(1, -1))
const parseDesc = (t: string) => {
  const b: any = Array.from(t.matchAll(descregx) ?? [])[0].groups
  return {
    usage: b.usage,
    description: b.desc
  }
}

export function getCommands(data: RegExpMatchArray[]): Command[] {
  return data.map((v: any) => ({
    name: v.groups.cmdName,
    ...parseDesc(v.groups.desc),
    aliases: parseTable(v.groups.alias)
  })).sort((a, b) => a.name.localeCompare(b.name));
}
