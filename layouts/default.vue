<template>
  <section>
    <b-navbar :fixed-bottom="bottom">
      <template #brand>
        <b-navbar-item tag="NuxtLink" :to="{ path: '/' }">
          <h4 class="title is-4">fates site</h4>
        </b-navbar-item>
      </template>
      <template #start>
        <template v-for="item in items">
          <b-navbar-item v-if="!item.dropdown" tag="NuxtLink" :key="item.title" :to="{ path: item.to }" >
            <b-tooltip :label="item.tooltip" position="is-bottom" type="is-dark">{{ item.title }}</b-tooltip>
          </b-navbar-item>
          <b-navbar-dropdown v-else :label="item.title" :collapsible="true" :key="item.title">
            <b-navbar-item tag="NuxtLink" v-for="item2 in item.items" :key="item2.title" :to="{ path: item2.to }">
              <b-tooltip :label="item2.tooltip || item2.title" position="is-left" type="is-dark">{{ item2.title }}</b-tooltip>
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button @click="toggleBottom">{{ bottom ? "Top" : "Bottom" }}</b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container is-10">
      <nuxt />
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
export default Vue.extend({
  data() {
    return {
      items: [
        {
          title: "Home",
          tooltip: "Home page for this site",
          to: "/"
        },
        {
          title: "Scripts",
          tooltip: "scripts page for the scripts that i've made",
          to: "/scripts",
        },
        {
          dropdown: true,
          title: "Tools",
          tooltip: "lua tools page",
          to: "/tools",
          items: [{
            title: "lol",
            to: "lol"
          },{
            title: "lol2",
            to: "lol2"
          }]
        }
      ],
      bottom: false
    }
  },
  methods: {
    toggleBottom() {
      this.bottom = !this.bottom
    }
  }
});
</script>

<style>
@import url("https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css");

.nuxt-link-exact-active {
  color: #24b98c;
}
</style>
