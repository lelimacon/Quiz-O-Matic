import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"
import qsQuiz from "../store/QsQuiz.js"
import { renderSvgSeparatePages } from "../lib/renderer.js"


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
        const svgs = await renderSvgSeparatePages(qsQuiz.state)

        this.innerHTML = svgs.join("")
    }

    updateZoom(zoom)
    {
        const zoomStr = zoom == -1
            ? `calc(100% - 16px)`
            : `calc(${zoom / 100.0} * 842px)`

        this.style.setProperty("--qs-preview-zoom", zoomStr)
    }
})
