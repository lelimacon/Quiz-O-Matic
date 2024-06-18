

let compile = (content) => { return "loading..." }

document.getElementById('typst').addEventListener('load', function () {
  $typst.setCompilerInitOptions({
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  });
  $typst.setRendererInitOptions({
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
  });

  compile = async (content) => {
    const svg = await $typst.svg({ mainContent: content });
    console.log(`rendered`);
    return svg;
  };
});


customElements.define('typst-view',
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
        'content',
      ];
    }

    setHtmlContent = async () =>
    {
      const content = this.getAttribute('content');
      const svg = await compile(content);
      this.innerHTML = svg;
    }
  }
);
