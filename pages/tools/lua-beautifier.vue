<template>
  <section class="section">
    <h4 class="title is-4">Lua Editor</h4>
    <p class="subtitle">beautify, minify, uglify lua code</p>
    <div id="box">
      <client-only>
          <Editor ref="Editor" lang="lua" :value="val"/>
      </client-only>
    </div>
    <br>
    <b-button @click="Reset">Reset</b-button>
    <b-button @click="Beautify">Beautify</b-button>
    <b-button @click="Minify">Minify</b-button>
    <b-button @click="Uglify">Uglify</b-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { BeautifyCode, ExecuteCode, MinifyCode, SetEditorValue, UglifyCode } from "~/utils/Utils"
import { L } from "~/modules/lua";
import { NuxtAxiosInstance } from "@nuxtjs/axios/types";

export default Vue.extend({
  head: {
    title: "Lua Beautifier | fates site",
    meta: [{
      name: "description",
      content: "beautify, minify, uglify lua code"
    },{
      name: "og:description",
      content: "beautify, minify, uglify lua code"
    },{
      name: "og:title",
      content: "fate0.xyz/tools/lua-beautifier"
    }]
  },
  components: {
    Editor: () => import("~/components-lazy/AceEditor")
  },
  data() {
    return {
      L,
      options: {
        RenameVariables: false,
        RenameGlobals: false,
        SolveMath: false,
      }
    }
  },
  methods: {
    Exec() {
      ExecuteCode(L);
    },
    Beautify() {
      BeautifyCode(this.options);
    },
    Minify() {
      MinifyCode(this.options);
    },
    Uglify() {
      UglifyCode(this.options);
    },
    Reset() {
      SetEditorValue('print("Hello World");');
    }
  },
  async asyncData(Context) {
    const axios = (Context as typeof Context & { $axios: NuxtAxiosInstance }).$axios
    let code = (Context.query as typeof Context.params & { code: string })?.code
    if (code) {
      if (code.match(/^htt(p|ps):\/\//))
        code = (await axios.get(code)).data
      return { val: code.toString() }
    }
    return { val: null }
  }
})
</script>
