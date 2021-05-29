<template>
  <section class="section">
    <h4 class="title is-4">Lua Editor</h4>
    <p class="subtitle">test</p>
    <div id="box">
      <client-only>
          <Editor ref="Editor" lang="javascript"/>
      </client-only>
    </div>
    <br>
    <b-button>Execute</b-button>
  </section>
</template>

<script lang="ts">
import Vue, { VueConstructor, Component } from "vue";
import AceAjax from "~/node_modules/brace";

export default (Vue as VueConstructor<
  Vue & {
    editor: AceAjax.Editor,
  }
>).extend({
  components: {
    Editor: () => import("~/components-lazy/AceEditor")
  },
  data() {
    return {
    }
  },
  methods: {

  }
})
</script>
