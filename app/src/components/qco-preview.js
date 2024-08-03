import {
    $typst,
    preloadRemoteFonts,
} from "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
// DOC: https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

import sources from "../sources.js"
import { elementFromHTML } from "../lib/utils.js"
import { lengths, getLevelIndex } from "../lib/constants.js"
import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"
import qsQuiz from "../store/QsQuiz.js"


const init = async () =>
{
    console.log("typst init")

    $typst.setCompilerInitOptions
    ({
        beforeBuild:
        [
            preloadRemoteFonts
            ([
                "/template/res/LuckiestGuy-Regular.ttf",
                "/template/res/Quicksand-Regular.ttf",
                "/template/res/Quicksand-Bold.ttf",

                // Emoji font is automatically used.
                "/template/res/NotoEmoji-VariableFont_wght.ttf",
            ]),
        ],
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
    })
    $typst.setRendererInitOptions
    ({
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm",
    })

    const fetchText = (path) => fetch(path).then(r => r.text())
    const add = async (path) =>
    {
        const text = await fetchText(`/template${path}`)
        //console.log("ADD", path, text)
        await $typst.addSource(path, text)
    }

    await add("/main.typ")

    await add("/constants.typ")
    await add("/entities.typ")
    await add("/generator.typ")
    await add("/random.typ")
    await add("/utils.typ")

    for (const source of sources.sources)
    {
        const add = async (path) =>
        {
            const text = await fetchText(`${source.baseUrl}${path}`)
            //console.log("ADD", path)
            return $typst.addSource(`/${path}`, text)
        }

        for (const exercise of source.exercises)
        {
            //console.log("exercise", exercise)
            await add(exercise.path)
        }

        for (const theme of source.themes)
        {
            await add(theme.path)

            if (theme.assets)
            {
                for (const assetName of theme.assets)
                {
                    const themeDir = theme.path.substring(0, theme.path.lastIndexOf("/") + 1)
                    const assetPath = `${themeDir}${assetName}`
                    await add(assetPath)
                }
            }
        }
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
        const exercises = qsQuiz.state.exercises.map(e =>
        { return {
            path: e.path,
            seed: e.seed,
            level: getLevelIndex(e.levelScale, e.selectedLevel),
            length: lengths[e.selectedLength],
        }})

        const data =
        {
            mode: parseInt(qsQuiz.state.mode),
            theme: qsQuiz.state.theme,
            title: qsQuiz.state.title,
            subtitle: qsQuiz.state.subtitle,
            date: qsQuiz.state.date,
            exercises,
        }

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
