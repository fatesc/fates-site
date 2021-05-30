import { NuxtApp } from "@nuxt/types/app";
import AceAjax from "brace";

export interface Command {
  name: string
  description: string
  aliases?: string | string[]
}

export interface ExtendedNuxtApp extends NuxtApp {
  editor: AceAjax.Editor
}
