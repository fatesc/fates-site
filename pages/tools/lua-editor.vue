<template>
  <section class="section">
    <h4 class="title is-4">Lua Editor</h4>
    <p class="subtitle">execute lua (5.2) code</p>
    <div id="box">
      <client-only>
          <Editor ref="Editor" lang="lua" :value="val"/>
      </client-only>
    </div>
    <br>
    <b-button @click="Reset">Reset</b-button>
    <b-button @click="Exec">Execute</b-button>
    <b-button @click="RemoveByteAndHex">Remove Byte and Hexadecimals</b-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { ExecuteCode, GetEditorValue, SetEditorValue } from "~/utils/Utils"
import { L } from "~/modules/lua";
import { NuxtAxiosInstance } from "@nuxtjs/axios/types";

export default Vue.extend({
  head: {
    title: "Lua Editor | fates site",
    meta: [{
      name: "description",
      content: "execute lua (5.2) code"
    },{
      name: "og:description",
      content: "execute lua (5.2) code"
    },{
      name: "og:title",
      content: "fate0.xyz/tools/lua-editor"
    }]
  },
  components: {
    Editor: () => import("~/components-lazy/AceEditor")
  },
  data() {
    return {
      L
    }
  },
  methods: {
    Exec() {
      ExecuteCode(this.L)
    },
    Reset() {
      SetEditorValue('print("Hello World");');
    },
    RemoveByteAndHex() {
      const Script = GetEditorValue().replace(/(?<byte>\\\d*)/g, (str) => String.fromCharCode(parseInt(str.replace(/\\/,"")))).replace(/[^\w](?<hex>0x\d*)[^\w]/g, (str) => parseInt(str).toString());
      SetEditorValue(Script);
    }
  },
  async asyncData(Context) {
    const axios = (Context as typeof Context & { $axios: NuxtAxiosInstance }).$axios
    let code = (Context.query as typeof Context.params & { code: string })?.code
    if (code) {
      if (code.match(/^htt(p|ps):\/\//))
        code = (await axios.get(code)).data;
      return { val: code.toString() }
    }
    return { val: null }
  }
})
</script>
