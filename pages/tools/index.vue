<template>
  <section class="section">
    <h2 class="title is-2"><u>Tools Page</u></h2>
    <p class="subtitle">some tools (mosly lua) that i use from time to time</p>
    <br>
    <ul>
      <h5 class="title is-5">Todo: add editor config and a more 'appealing' look</h5>
      <li class="list"><NuxtLink to="/tools/lua-editor">Lua editor</NuxtLink></li>
      <li class="list"><NuxtLink to="/tools/lua-beautifier">Lua beautifier</NuxtLink></li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "Vue"
export default Vue.extend({
  head: {
    title: "Tools | fates site",
    meta: [{
      name: "description",
      content: "some tools (mosly lua) that i use from time to time"
    },{
      name: "og:description",
      content: "some tools (mosly lua) that i use from time to time"
    },{
      name: "og:title",
      content: "fate0.xyz/tools"
    }]
  },
})
</script>
