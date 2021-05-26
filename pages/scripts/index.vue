<template>
  <section class="section">
    <h3 class="title is-3">Scripts Page</h3>
    <div class="columns is-mobile">

    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "~/components/Card.vue";

export default Vue.extend({
  head: {
    title: "fates site - Scripts",
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
