<template>
  <section class="section">
    <h4 class="title is-4">Lua Editor</h4>
    <p class="subtitle">test</p>
    <client-only>
        <Editor :width="1000" :height="600"/>
    </client-only>
    <b-button>deobfuscate psu</b-button>
  </section>
</template>

<script>
export default {
  components: {
    Editor: () => import("~/components-lazy/AceEditor")
  }
}
</script>
