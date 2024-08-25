import {
    $typst,
    preloadRemoteFonts,
}
from "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts/dist/esm/contrib/all-in-one-lite.bundle.js"
// DOC: https://myriad-dreamin.github.io/typst.ts/cookery/guide/all-in-one.html

import { elementFromHTML } from "./utils.js"
import { lengths, getLevelIndex } from "./constants.js"


let isInitialized = false
let isLoading = false


const fetchText = (path) => fetch(path).then(r => r.text())
const dirFromPath = (path) => path.substring(0, path.lastIndexOf("/") + 1)

const sleep = (ms) => new Promise((resolve) =>
{
    setTimeout(resolve, ms)
})

const isReady = () => isInitialized && !isLoading

const waitUntilReady = async () =>
{
    let count = 0

    while (!isReady())
    {
        if (count++ > 100)
        {
            console.error("Renderer did not initialize")
            return false
        }

        await sleep(200)
    }

    return true
}

const init = async () =>
{
    if (isInitialized)
    {
        console.error("Renderer: Already initialized")
        return
    }

    isLoading = true
    console.log("Renderer: Initializing")

    $typst.setCompilerInitOptions
    ({
        beforeBuild:
        [
            preloadRemoteFonts
            ([
                "template/res/LuckiestGuy-Regular.ttf",
                "template/res/Quicksand-Regular.ttf",
                "template/res/Quicksand-Bold.ttf",

                // Emoji font is automatically used.
                "template/res/NotoEmoji-VariableFont_wght.ttf",
            ]),
        ],
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
    })
    $typst.setRendererInitOptions
    ({
        getModule: () => "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm",
    })

    const add = async (path) =>
    {
        //console.log("ADD", path)
        const text = await fetchText(`template${path}`)
        await $typst.addSource(path, text)
    }

    await add("/builder.typ")
    await add("/entities.typ")
    await add("/constants.typ")
    await add("/main.typ")
    await add("/random.typ")
    await add("/theme-answers.typ")
    await add("/utils.typ")

    isInitialized = true
    isLoading = false
    console.log("Renderer: Initialized")
}

const loadSource = async (source) =>
{
    if (!isInitialized)
    {
        console.error("Renderer: Not initialized")
        return
    }

    if (isLoading)
    {
        console.error("Renderer: Already loading")
        return
    }

    isLoading = true
    console.log(`Renderer: Loading source from '${source.baseUrl}'`)

    const add = async (path) =>
    {
        //console.log("INNER ADD", path)
        const text = await fetchText(`${source.baseUrl}${path}`)
        return $typst.addSource(`/${path}`, text)
    }

    const addAssets = async (assets, baseDir) =>
    {
        if (!assets)
            return

        for (const assetName of assets)
        {
            const assetPath = `${baseDir}${assetName}`
            await add(assetPath)
        }
    }

    for (const exercise of source.exercises)
    {
        //console.log("exercise", exercise)
        await add(exercise.path)
        await addAssets(exercise.assets, dirFromPath(exercise.path))
    }

    for (const theme of source.themes)
    {
        await add(theme.path)
        await addAssets(theme.assets, dirFromPath(theme.path))
    }

    isLoading = false
    console.log("Renderer: Source loaded")
}


const generateData = (quiz) =>
{
    const exercises = quiz.exercises.map(e =>
    { return {
        path: e.path,
        seed: e.seed,
        level: getLevelIndex(e.levelScale, e.selectedLevel),
        length: lengths[e.selectedLength],
    }})

    const data =
    {
        mode: parseInt(quiz.mode),
        theme: quiz.theme,
        title: quiz.title,
        subtitle: quiz.subtitle,
        date: quiz.date,
        exercises,
    }

    return data
}

const renderPdf = async (quiz) =>
{
    const data = generateData(quiz)

    const encoder = new TextEncoder()
    $typst.mapShadow('/data.json', encoder.encode(JSON.stringify(data)))

    const pdf = await $typst.pdf()
    return pdf
}

const renderSvg = async (quiz) =>
{
    const data = generateData(quiz)

    const encoder = new TextEncoder()
    $typst.mapShadow('/data.json', encoder.encode(JSON.stringify(data)))

    const svg = await $typst.svg()
    return svg
}

const splitSvgByPage = (svg) =>
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

    return svgs
}

const renderSvgSeparatePages = async (quiz) =>
{
    const data = generateData(quiz)

    const encoder = new TextEncoder()
    $typst.mapShadow('/data.json', encoder.encode(JSON.stringify(data)))

    const svg = await $typst.svg()
    const svgs = splitSvgByPage(svg)
    return svgs
}


export default {
    isReady: isReady,
    waitUntilReady: waitUntilReady,
    init: init,
    loadSource: loadSource,
    renderPdf: renderPdf,
    renderSvg: renderSvg,
    renderSvgSeparatePages: renderSvgSeparatePages,
}
