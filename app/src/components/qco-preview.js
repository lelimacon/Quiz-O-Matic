import "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
// DOC: https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

import { lengths, getLevelIndex } from "../lib/constants.js"
import qsOutline from "../store/QsOutline.js"
import QComponent from "../lib/QComponent.js"


const init = async () =>
{
    console.log("typst init")

    $typst.setCompilerInitOptions(
    {
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
    })
    $typst.setRendererInitOptions(
    {
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm",
    })

    const getDoc = (path) => fetch(`template${path}`).then(r => r.text())
    const add = async (path) => $typst.addSource(path, await getDoc(path))

    await add("/main.typ")
    await add("/constants.typ")
    await add("/random.typ")
    await add("/theme.typ")
    await add("/utils.typ")
    await add("/entities.typ")

    const library = JSON.parse(await fetch(`library.json`).then(r => r.text()))
    for (const quiz of library)
    {
        await add(quiz.path)
    }

    console.log("typst ready")
}

await init()


customElements.define("qco-preview", class extends QComponent
{
    constructor()
    {
        super
        ({
            store: qsOutline,
        })
    }

    async render()
    {
        const level = (e) => getLevelIndex(e.levelScale, e.selectedLevel)
        const length = (e) => lengths[e.selectedLength]

        const data = qsOutline.state.items
            .map(e => `${e.code};${e.seed};${level(e)};${length(e)}`)
            .join("\n")

        const csv = `code;seed;level;length\n${data}`
        //console.log("CSV", csv)

        const encoder = new TextEncoder()
        $typst.mapShadow('/data.csv', encoder.encode(csv))
    
        const svg = await $typst.svg()
        //console.log("rendered")
    
        this.innerHTML = svg
    }
})
