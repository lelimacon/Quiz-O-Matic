import "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
// DOC: https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

import metadata from "../metadata.js"
import { elementFromHTML } from "../lib/utils.js"
import { lengths, getLevelIndex } from "../lib/constants.js"
import QComponent from "../lib/QComponent.js"
import qsQuiz from "../store/QsQuiz.js"
import qsPreview from "../store/QsPreview.js"


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
    await add("/entities.typ")
    await add("/generator.typ")
    await add("/random.typ")
    await add("/theme.typ")
    await add("/utils.typ")

    for (const exercise of metadata.exercises)
        await add(exercise.path)

    for (const theme of metadata.themes)
        await add(theme.path)
    
    console.log("typst ready")
}

await init()


customElements.define("qco-preview", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        this.updateZoom(50)

        qsQuiz.events.subscribe("qe_stateChanged", (e) => this.render())
        qsPreview.events.subscribe("qe_setZoom", (e) => this.updateZoom(e.zoom))
    }

    async render()
    {
        const data = this.generateData()
        const svg = await this.generateSvg(data)
        const html = this.processSvg(svg)

        this.innerHTML = html
    }

    updateZoom(zoom)
    {
        const zoomStr = zoom == -1
            ? `calc(100% - 16px)`
            : `calc(${zoom / 100.0} * 842px)`

        this.style.setProperty("--qs-preview-zoom", zoomStr)
    }

    generateData()
    {
        const mode = parseInt(qsQuiz.state.mode)
        const theme = qsQuiz.state.theme

        const exercises = qsQuiz.state.exercises.map(e =>
        { return {
            code: e.code,
            seed: e.seed,
            level: getLevelIndex(e.levelScale, e.selectedLevel),
            length: lengths[e.selectedLength],
        }})

        const data = { theme, mode, exercises }

        return data
    }

    async generateSvg(data)
    {
        const encoder = new TextEncoder()
        $typst.mapShadow('/data.json', encoder.encode(JSON.stringify(data)))
    
        const svg = await $typst.svg()
        return svg
    }

    processSvg(svg)
    {
        const $svg = elementFromHTML(svg)
        $svg.classList.add("page")
        $svg.setAttribute("viewBox", "0 0 596.000 842.000")
        $svg.removeAttribute("width")
        $svg.removeAttribute("height")
        $svg.removeAttribute("data-width")
        $svg.removeAttribute("data-height")

        const $pages = $svg.querySelectorAll(".typst-page")

        if ($pages.length === 1)
        {
            return $svg.outerHTML
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
            $pageSvg.append($page)

            svgs.push($pageSvg.outerHTML)
        }

        return svgs.join("")
    }
})
