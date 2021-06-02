import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Command, ExtendedNuxtApp } from "./types";
import { Beautify, Minify, Uglify, Options } from "~/modules/luamin";
import { Editor } from "brace";

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
  const data = Array.from(((await axios.get("https://raw.githubusercontent.com/fatesc/fates-admin/main/main.lua")).data as string)?.matchAll(regx))
  return data.map((v: any) => ({
    name: v.groups.cmdName,
    ...parseDesc(v.groups.desc),
    aliases: parseTable(v.groups.alias)
  })).sort((a, b) => a.name.localeCompare(b.name));
}


export function ExecuteLua51(L: any, code: string): void {
  const editor = (self.$nuxt as ExtendedNuxtApp)?.editor
  if (editor) {
    try {
      editor.setValue("");
      L.execute(`os,getfenv={},function()return _ENV;end;${code}`);
    } catch(err) {
      editor.setValue(`--[[\n\terror while attempting to execute:\n\t${err}\n]]`);
    }
    editor.clearSelection();
  }
}

export function ExecuteCode(L: any): void {
  const editor = (self.$nuxt as ExtendedNuxtApp)?.editor
  if (editor) {
    ExecuteLua51(L, editor.getValue());
  }
}

export function GetEditor(): Editor {
  const editor = (self.$nuxt as ExtendedNuxtApp)?.editor
  return editor ?? null
}

export function GetEditorValue(): string {
  const editor = (self.$nuxt as ExtendedNuxtApp)?.editor
  if (editor) {
    return editor.getValue();
  }
  return ''
}

export function SetEditorValue(Value: string): void {
  const editor = (self.$nuxt as ExtendedNuxtApp)?.editor
  if (editor) {
    editor.setValue(Value);
    editor.clearSelection();
  }
}


export function GetThemes(): string[] {
  const files = [
    "xcode", "vibrant_ink", "twilight", "tomorrow_night_eighties", "tomorrow_night_bright", "tomorrow_night_blue",
    "tomorrow_night", "textmate", "terminal", "sqlserver", "solarized_light", "solarized_dark", "pastel_on_dark",
    "mono_industrial", "monokai", "merbivore_soft", "merbivore", "kuroir", "kr_theme", "katzenmilch", "iplastic",
    "idle_fingers", "gruvbox", "gob", "github", "eclipse", "dreamweaver", "dracula", "dawn", "crimson_editor",
    "cobalt", "clouds_midnight", "clouds", "chrome", "chaos", "ambiance"
  ].sort();
  return files
}

export async function BeautifyCode(options: Options): Promise<void> {
  const now = new Date().getTime();
  try {
    const script = await Beautify(GetEditorValue(), options);
    SetEditorValue(script.replace(script.charAt(5), `\tbeautifying took ${(new Date().getTime() - now) / 1000} seconds\n\t`));
  } catch(err) {
    SetEditorValue(`--[[\n\terror while attempting to beautify:\n\t${err}\n]]`);
  }
}

export async function UglifyCode(options: Options): Promise<void> {
  const now = new Date().getTime();
  try {
    const script = await Uglify(GetEditorValue(), options);
    SetEditorValue(script.replace(script.charAt(5), `\tuglifying took ${(new Date().getTime() - now) / 1000} seconds\n\t`));
  } catch(err) {
    SetEditorValue(`--[[\n\terror while attempting to uglifying:\n\t${err}\n]]`);
  }
}

export async function MinifyCode(options: Options): Promise<void> {
  const now = new Date().getTime();
  try {
    const script = await Minify(GetEditorValue(), options);
    SetEditorValue(script.replace(script.charAt(5), `\tminifying took ${(new Date().getTime() - now) / 1000} seconds\n\t`));
  } catch(err) {
    SetEditorValue(`--[[\n\terror while attempting to minifying:\n\t${err}\n]]`);
  }
}
