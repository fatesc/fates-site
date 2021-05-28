<template>
  <div>
    <section class="section">
      <h2 class="title is-2">fates admin</h2>
      <p class="subtitle">an undetected roblox admin script with fe features</p>
      <!-- <p class="subtitle"><a href="">Discord Server</a></p> -->
      <a class="subtitle" href="https://discord.com/invite/5epGRYR" target="#">Discord Server</a>
    </section>
    <section class="section">
      <h3 class="title is-3"><u>Credits</u></h3>
      <ul>
        <li><a href="https://github.com/fatesc" target="#">fate#5647</a> (Main Script Developer)</li>
        <li><a href="https://github.com/Iaying6564" target="#">Iaying#6564</a> (Script Developer)</li>
        <li><a href="https://github.com/misrepresenting" target="#">misrepresenting#4917</a> (UI Developer)</li>
        <li><a href="https://github.com/Fluxxx222" target="#">Shawn#2000</a> (Management)</li>
      </ul>
    </section>
    <section class="section">
      <h3 class="title is-3"><u>Commands</u></h3>
      <b-field>
          <div class="container is-mobile">
            <label class="label">All commands listed are undetected by the client!</label>
            <b-autocomplete dropdown-position="top" placeholder="Search Commands" icon="magnify" v-model="search" :data="filterCommands">
              <template #empty>No results found</template>
            </b-autocomplete>
            <p class="help">{{ commands.length }}/{{ oldcommands.length }} commands matching your search</p>
          </div>
      </b-field>
      <div class="container is-mobile">
        <Card v-for="(command, i) in commands" :key="command.name" class="is-4" :title="(i + 1) + '. ' + command.name">
            <p class="has-text-white">Aliases: {{ command.aliases ? command.aliases.join(", ") : "none" }}</p>
            <p class="has-text-white">Description: {{ command.description }}</p>
        </Card>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import Card from "~/components/Card.vue";
import { getCommands } from "~/Utils/Utils";
import { Command } from "~/Utils/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default (Vue as VueConstructor<
  Vue & {
    $axios: NuxtAxiosInstance
  }
>).extend({
  head: {
    title: "fates admin | fates site",
    meta: [{
      name: "description",
      content: "an undetected roblox admin script with fe features"
    }, {
      name: "og:description",
      content: "an undetected roblox admin script with fe features"
    }, {
      name: "og:title",
      content: "fate0.xyz/scripts/fates-admin"
    }]
  },
  components: {
    Card
  },
  data() {
    return {
      search: "",
      commands: [],
      oldcommands: []
    }
  },
  async asyncData({ $axios }) {
    const regx = /AddCommand\("(?<cmdName>\S+)",\ *(?<alias>{.*?}),\ *"(?<desc>.*?)"/gmi
    const data: Command[] = getCommands(Array.from((await $axios.$get("https://raw.githubusercontent.com/fatesc/fates-admin/main/main.lua") as string)?.matchAll(regx)));
    return { commands: data, oldcommands: data }
  },
  computed: {
    filterCommands() {
      this.commands = this.oldcommands
      this.commands = this.commands.filter((command: Command) => command.name.toString().toLowerCase().indexOf(this.search.toLowerCase()) >= 0);
      return ((this as any).commands as Array<Command>).map(command => command.name);
    }
  }
})
</script>
