import Vue, { VueConstructor } from "vue";
import AceAjax, * as ace from "brace";

export default (Vue as VueConstructor<
  Vue & {
    editorVal: string,
    editor: AceAjax.Editor,
    width: number,
    height: number
  }
>).extend({
  name: "AceEditor",
  props: {
    value: {
      type: String,
      default: 'print("Hello World");'
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
      type: Function,
      default() {
        return {
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showPrintMargin: false,
          highlightActiveLine: true,
        }
      }
    },
    EditorInit: {
      type: Function,
      default() {
        const box = document.getElementById("box");
        window.addEventListener("resize", () => {
          this.width = <number>box?.clientWidth
          this.height = <number>box?.clientHeight
        });
        this.width = <number>box?.clientWidth
        this.height = <number>box?.clientHeight
      }
    }
  },
  data() {
    return {
      editor: null,
      editorVal: '',
      width: 600,
      height: 600
    }
  },
  watch: {
    width() {
      this.editor.resize();
    },
    height() {
      this.editor.resize();
    },
    value() {
      this.editorVal = this.value
      this.editor.setValue(this.value);
    },
    theme() {
      require(`brace/theme/${this.theme}`);
      this.editor.setTheme(`ace/theme/${this.theme}`);
    },
    lang() {
      require(`brace/mode/${this.lang}`);
      this.editor.getSession().setMode(`ace/mode/${this.lang}`);
    }
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor.container.remove();
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
    this.editor = ace.edit(<any>this.$el);
    const editor = this.editor
    this.$emit("init", editor);
    editor.$blockScrolling = Infinity

    require("brace/ext/language_tools");
    require(`brace/mode/${this.lang}`);
    require(`brace/theme/${this.theme}`);


    editor.getSession().setMode(`ace/mode/${this.lang}`)
    editor.setTheme(`ace/theme/${this.theme}`);

    editor.setValue(this.value ?? "");
    editor.setOptions(this.options() ?? {});

    editor.clearSelection();

    this.EditorInit();
  },
})
