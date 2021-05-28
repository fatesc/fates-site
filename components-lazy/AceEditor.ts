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
      default: "tomorrow_night"
    },
    lang: {
      type: String,
      default: "lua"
    },
    options: {
      type: Object,
      default: {
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
        highlightActiveLine: true,

      }
    },
    editor: {
      type: AceAjax.Editor,
    },
    editorVal: {
      default: ''
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
      });
    },
    height() {
      this.$nextTick(() => {
        this.editor.resize();
      });
    },
    value() {
      this.editorVal = this.value
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

    require("brace/ext/language_tools");
    require(`brace/mode/${this.lang}`);
    require(`brace/theme/${this.theme}`);


    editor.getSession().setMode(`ace/mode/${this.lang}`)
    editor.setTheme(`ace/theme/${this.theme}`);

    editor.setValue(this.value ?? "");
    editor.setOptions(this.options ?? {});

    editor.clearSelection();
  },
})
