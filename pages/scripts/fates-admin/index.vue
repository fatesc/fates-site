<template>
  <section class="section">
    <h3 class="title is-3">Scripts Page</h3>
    <div class="columns is-mobile">
      <Card class="is-4 is-offset-1" title="Script"><code>loadstring('');</code></Card>
      <Card class="is-4 is-offset-2" title="Script"><code>loadstring('');</code></Card>
    </div>
    <div class="content">
      <p v-for="command in commands" :key="command.name">{{ command.name }}</p>
      <br>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import Card from "~/components/Card.vue";
import { getCommands } from "~/Utils/Utils";
import { Command } from "~/Utils/types";

export default Vue.extend({
  head: {
    title: "fates site - fates admin",
    meta: [{
      name: "description",
      content: "an undetected roblox admin script with fe features"
    }, {
      name: "og:description",
      content: "an undetected roblox admin script with fe features"
    }, {
      name: "og:title",
      content: "fate0.xyz/scripts"
    }]
  },
  components: {
    Card
  },
  data() {
    return {
      commands: {}
    }
  },
  async mounted() {
    const regx = /AddCommand\("(?<cmdName>\S+)",\ *(?<alias>{.*?}),\ *"(?<desc>.*?)"/gmi
    const data: Command[] = getCommands(Array.from((await this.$axios.$get("https://raw.githubusercontent.com/fatesc/fates-admin/main/main.lua") as string)?.matchAll(regx)));
    this.commands = data
  }
})
</script>
