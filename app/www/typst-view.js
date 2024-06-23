// https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

let compile = (data) => { return "loading..." }

document.getElementById("typst").addEventListener("load", async () => {
  $typst.setCompilerInitOptions({
    getModule: () =>
      "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
  });
  $typst.setRendererInitOptions({
    getModule: () =>
      "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm",
  });

  const getDoc = (path) => fetch(`template${path}`).then(r => r.text());
  const add = async (path) => $typst.addSource(path, await getDoc(path));

  await add("/main.typ");
  await add("/models.typ");
  await add("/random.typ");
  await add("/theme.typ");
  await add("/utils.typ");
  await add("/entities.typ");
  await add("/quizzes/mathematics/arithmetics/arithm-addict.typ");
  await add("/quizzes/mathematics/arithmetics/pop-quiz.typ");
  await add("/quizzes/mathematics/arithmetics/sharing-is-caring.typ");

  compile = async (data) => {
    const encoder = new TextEncoder();
    $typst.mapShadow('/data.csv', encoder.encode(data));
    const svg = await $typst.svg();
    console.log("rendered");
    return svg;
  };

  console.log("ready");
});


customElements.define("typst-view",
  class extends HTMLElement {

    constructor() {
      super();
    }

    connectedCallback() {
      this.setHtmlContent();
    }

    attributeChangedCallback() {
      this.setHtmlContent();
    }

    static get observedAttributes() {
      return [
        'data',
      ];
    }

    setHtmlContent = async () =>
    {
      const data = this.getAttribute("data");
      const svg = await compile(data);
      this.innerHTML = svg;
    }
  }
);
