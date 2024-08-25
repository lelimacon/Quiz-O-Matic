import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"
import qsQuiz from "../store/QsQuiz.js"
import renderer from "../lib/renderer.js"


const sleep = (ms) => new Promise((resolve) =>
{
    setTimeout(resolve, ms)
})

const waitForRenderer = async () =>
{
    let count = 0

    while (!renderer.isReady())
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

    isRendering = false

    async render()
    {
        if (this.isRendering)
        {
            return
        }

        this.isRendering = true
        this.innerHTML = html`<div class="banner"><span>LOADING</span></div>` + this.innerHTML

        if (!await waitForRenderer())
        {
            return
        }

        // Run asynchronously to allow HTML to refresh.
        setTimeout(async () =>
        {
            const svgs = await renderer.renderSvgSeparatePages(qsQuiz.state)

            this.innerHTML = `<div class="pages">${svgs.join("")}</div>`
    
            this.isRendering = false
        }, 0)
    }

    updateZoom(zoom)
    {
        const zoomStr = zoom == -1
            ? `calc(100% - 16px)`
            : `calc(${zoom / 100.0} * 842px)`

        this.style.setProperty("--qs-preview-zoom", zoomStr)
    }
})
