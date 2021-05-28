import Vue from "vue";
import AceAjax, * as ace from "brace";

export default Vue.extend({
  name: "AceEditor",
  props: {
    value: {
      type: String,
      default: 'print("Hello World");'
    },
    width: {
      type: [String, Number],
      default: "600"
    },
    height: {
      type: [String, Number],
      default: "100"
    },
    theme: {
      type: String,
      default: "Tomorrow-night"
    },
    lang: {
      type: String,
      default: "Lua"
    },
    options: {
      type: Object,
      default: {}
    },
    editor: {
      type: AceAjax.Editor,
    }
  },
  data() {
    return {
      editor: null,
      editorVal: ''
    }
  },
  watch: {
    width() {
      this.$nextTick(() => {
        this.editor.resize();
      })
    }
  },

  render(createElement) {
    return createElement("div", {
      attrs: {
        style: `
        height: ${this.height}px;
        width: ${this.width}px;
        `
      },
    })
  },
  mounted() {
    this.editor = ace.edit(this.$el);
    const editor = this.editor
    this.$emit("init", editor);

    editor.getSession().setMode(`ace/mode/${this.lang}`)
    editor.setTheme(`ace/theme/${this.theme}`);

    this.editor.setValue(this.value ?? "");
    this.editor.setOptions(this.options ?? {});
  },
})
