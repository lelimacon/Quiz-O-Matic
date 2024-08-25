import "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"

import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import renderer from "../lib/renderer.js"
import qsQuiz from "../store/QsQuiz.js"


const download = (content, fileName, contentType) =>
{
    if(!contentType)
    {
        contentType = "application/octet-stream"
    }

    var $a = document.createElement("a")
    var blob = new Blob([content], { "type": contentType })
    $a.href = window.URL.createObjectURL(blob)
    $a.download = fileName
    $a.click()
}

const downloadZip = async (files, fileName) =>
{
    const zip = new JSZip()
    for (const file of files)
    {
        zip.file(file.name, file.content)
    }

    const zipData = await zip.generateAsync({
        type: "blob",
        streamFiles: true
    })

    var $a = document.createElement("a")
    $a.href = window.URL.createObjectURL(zipData)
    $a.download = fileName
    $a.click()
}


window.customElements.define("qco-downloads", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        this.innerHTML =
            html`
            <button class="button-icon" id="pdf" name="pdf" aria-label="PDF download">
                <span class="iconoir-page-flip"></span>
                Download as PDF
            </button>
            <button class="button-icon" id="svg" name="svg" aria-label="SVG download">
                <span class="iconoir-journal"></span>
                Download as SVG
            </button>
            <button class="button-icon" id="svgSeparatePages" name="svgSeparatePages" aria-label="SVG by page download">
                <span class="iconoir-archive"></span>
                Download as SVG separate pages
            </button>
            `

        this.$downloadPdf = this.querySelector("#pdf")
        this.$downloadSvg = this.querySelector("#svg")
        this.$downloadSvgSeparatePages = this.querySelector("#svgSeparatePages")
    }

    $downloadPdf = undefined
    $downloadSvg = undefined
    $downloadSvgSeparatePages = undefined

    connectedCallback()
    {
        this.$downloadPdf.addEventListener("click", async (e) =>
        {
            const quiz = qsQuiz.state
            const pdf = await renderer.renderPdf(quiz)
            const fileName = `${quiz.date} ${quiz.title}.pdf`

            download(pdf, fileName)
        })

        this.$downloadSvg.addEventListener("click", async (e) =>
        {
            const quiz = qsQuiz.state
            const svg = await renderer.renderSvg(quiz)
            const fileName = `${quiz.date} ${quiz.title}.svg`

            download(svg, fileName)
        })

        this.$downloadSvgSeparatePages.addEventListener("click", async (e) =>
        {
            const quiz = qsQuiz.state
            const svgs = await renderer.renderSvgSeparatePages(quiz)
            const files = svgs.map((svg, index) =>
            { return {
                name: `${quiz.date} ${quiz.title} ${index}.svg`,
                content: svg,
            }})
            const fileName = `${quiz.date} ${quiz.title}.zip`

            downloadZip(files, fileName)
        })
    }
})
