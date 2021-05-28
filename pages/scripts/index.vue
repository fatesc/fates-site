<template>
  <div>
    <section class="section">
      <h2 class="title is-2"><u>Scripts Page</u></h2>
    </section>
    <section class="section">
      <h4 class="title is-4" v-for="i in 4" :key="i"><a href="/scripts/fates-admin" >fates admin</a></h4>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "~/components/Card.vue";

export default Vue.extend({
  head: {
    title: "Scripts | fates site",
    meta: [{
      name: "description",
      content: "scripts page for my site"
    }, {
      name: "og:description",
      content: "scripts page for my site"
    }, {
      name: "og:title",
      content: "fate0.xyz/scripts"
    }]
  },
  components: {
    Card
  }
})
</script>
