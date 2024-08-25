import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"
import qsQuiz from "../store/QsQuiz.js"
import renderer from "../lib/renderer.js"


customElements.define("qco-preview", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        this.innerHTML =
            html`
            <div class="banner">
                <span>LOADING</span>
            </div>
            <div class="background">
                <img alt="Logo" src="logo.svg">
                <div>
                    An endless stream of tests<br />
                    for the selfish brats you spawned to replace yourselves
                </div>
            </div>
            <div class="pages">
            </div>
            `

        this.$pages = this.querySelector(".pages")
        this.isEmpty = true
        this.isRendering = false

        this.updateZoom(50)
    }

    connectedCallback()
    {
        qsQuiz.events.subscribe("qe_stateChanged", (e) => this.render())
        qsPreview.events.subscribe("qe_setZoom", (e) => this.updateZoom(e.zoom))
    }

    $pages = undefined

    _isEmpty = true
    _isRendering = false

    get isEmpty() { return this._isEmpty }
    set isEmpty(value)
    {
        this._isEmpty = value
        this.setAttribute("is-empty", value)
    }

    get isRendering() { return this._isRendering }
    set isRendering(value)
    {
        this._isRendering = value
        this.setAttribute("is-rendering", value)
    }

    async render()
    {
        if (this.isRendering)
        {
            return
        }

        this.isRendering = true

        if (!await renderer.waitUntilReady())
        {
            return
        }

        // Run asynchronously to allow HTML to refresh.
        setTimeout(async () =>
        {
            const svgs = await renderer.renderSvgSeparatePages(qsQuiz.state)

            if (qsQuiz.state.exercises.length > 0)
            {
                this.$pages.innerHTML = svgs.join("")
                this.isEmpty = false
            }
            else
            {
                this.$pages.innerHTML = null
                this.isEmpty = true
            }
    
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
