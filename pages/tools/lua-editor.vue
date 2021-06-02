<template>
  <section class="section">
    <h4 class="title is-4">Lua Editor</h4>
    <p class="subtitle">execute lua (5.2) code</p>
    <div id="box" style="height: 450px;">
      <client-only>
          <Editor ref="Editor" lang="lua" :value="val" :theme="editor.theme" :fontSize="editor.fontSize"/>
      </client-only>
    </div>
    <br>
    <b-tabs class="block">

      <b-tab-item label="Editor">
        <b-field>
          <b-switch v-model="editor.readonly" @input="ReadOnly">Read Only</b-switch>
        </b-field>
        <b-field label="Theme">
          <b-select placeholder="Theme" icon="paint-brush" icon-pack="fas" v-model="editor.theme" @input="SwitchTheme">
            <option v-for="theme in editor.themes" :key="theme" :value="theme">{{ theme }}</option>
          </b-select>
        </b-field>
        <b-field label="FontSize">
          <b-slider :min="14" :max="70" :custom-formatter="(val) => val + 'px'" v-model="editor.fontSize" rounded></b-slider>
        </b-field>
      </b-tab-item>

      <b-tab-item label="Tools">
        <h5 class="title is-5">Main</h5>
        <b-field class="buttons" group-multiline grouped>
          <b-button @click="Reset">Reset</b-button>
          <b-button @click="Exec">Execute</b-button>
          <b-button @click="RemoveByteAndHex">Remove Byte and Hexadecimals</b-button>
        </b-field>
        <div class="notification is-ghost">
          <h5 class="title is-5">Beautifier</h5>
          <b-field class="buttons" group-multiline grouped>
            <b-button @click="Beautify">Beautify</b-button>
            <b-button @click="Minify">Minify</b-button>
            <b-button @click="Uglify">Uglify</b-button>
          </b-field>
          <b-field label="Options" group-multiline grouped>
            <b-checkbox v-for="(val, option) in options" :key="option.toString()" :value="val" type="is-info" v-model="options[option.toString()]">{{ option.toString() }}</b-checkbox>
          </b-field>
        </div>

      </b-tab-item>
      <b-tab-item label="Other">
        <b-button>open file</b-button>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { ExecuteCode, GetEditor, GetEditorValue, SetEditorValue, GetThemes, BeautifyCode, MinifyCode, UglifyCode } from "~/utils/Utils"
import { L } from "~/modules/lua";
import { NuxtAxiosInstance } from "@nuxtjs/axios/types";

export default (Vue as VueConstructor<
  Vue & {
    // $buefy: typeof
  }
>).extend({
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
      editor: {
        readonly: false,
        themes: GetThemes(),
        theme: "tomorrow_night",
        fontSize: 14
      },
      options: {
        RenameVariables: false,
        RenameGlobals: false,
        SolveMath: false,
      },
      L
    }
  },
  methods: {
    ReadOnly() {
      GetEditor().setReadOnly(this.editor.readonly);
    },
    SwitchTheme() {

    },
    Beautify() {
      console.log(this.options.RenameVariables);
      BeautifyCode(this.options);
    },
    Minify() {
      MinifyCode(this.options);
    },
    Uglify() {
      UglifyCode(this.options);
    },
    SetFontSize() {
      GetEditor().setFontSize("40px");
    },
    Exec() {
      ExecuteCode(this.L)
    },
    Reset() {
      SetEditorValue('print("Hello World");');
    },
    RemoveByteAndHex() {
      const Script = GetEditorValue().replace(/(?<byte>\\\d*)/g, (str) => String.fromCharCode(parseInt(str.replace(/\\/,"")))).replace(/[^\w](?<hex>0x\d*)[?^\w]/g, (str) => str.charAt(0) + parseInt(str.slice(1)).toString());
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
