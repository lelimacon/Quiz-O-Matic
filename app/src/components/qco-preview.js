import "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
// DOC: https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

import { elementFromHTML } from "../lib/utils.js"
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
        const csv = this.generateCsv()
        const svg = await this.generateSvg(csv)
        const svgs = this.splitSvg(svg)
    
        this.innerHTML = svgs.join("")
    }

    generateCsv()
    {
        const level = (e) => getLevelIndex(e.levelScale, e.selectedLevel)
        const length = (e) => lengths[e.selectedLength]

        const data = qsOutline.state.items
            .map(e => `${e.code};${e.seed};${level(e)};${length(e)}`)
            .join("\n")

        const csv = `code;seed;level;length\n${data}`
        return csv
    }

    async generateSvg(csv)
    {
        const encoder = new TextEncoder()
        $typst.mapShadow('/data.csv', encoder.encode(csv))
    
        const svg = await $typst.svg()
        return svg
    }

    splitSvg(svg)
    {
        const $svg = elementFromHTML(svg)
        $svg.classList.add("page")

        const $pages = $svg.querySelectorAll(".typst-page")

        if ($pages.length === 1)
        {
            return [$svg.outerHTML]
        }

        for (const $page of $pages)
        {
            $svg.removeChild($page)
        }

        const emptySvg = $svg.outerHTML
        //console.log("emptySvg", emptySvg)

        const svgs = []

        for (const $page of $pages)
        {
            $page.removeAttribute("transform")

            const $pageSvg = elementFromHTML(emptySvg)
            $pageSvg.setAttribute("viewBox", "0 0 596.000 842.000")
            $pageSvg.setAttribute("width", "596.000")
            $pageSvg.setAttribute("height", "842.000")
            $pageSvg.setAttribute("data-width", "596.000")
            $pageSvg.setAttribute("data-height", "842.000")
            $pageSvg.append($page)

            svgs.push($pageSvg.outerHTML)
        }

        return svgs
    }
})
