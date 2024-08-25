import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"
import qsQuiz from "../store/QsQuiz.js"
import renderer from "../lib/renderer.js"


const sleep = (ms) => new Promise((resolve) =>
{
    setTimeout(resolve, ms)
})

const expensive = () => new Promise((resolve) =>
{
    let x = 1
    for (let i = 0; i < 1000000000; i++)
    {
        x /= 37
    }
    resolve(x)
})

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
        if (!renderer.isInitialized())
        {
            return
        }

        //return

        //const $workerIframe = document.querySelector("#worker-iframe")
        //const message =
        //{
        //    action: "renderSvg",
        //    payload: qsQuiz.state,
        //}
        //$workerIframe.contentWindow.postMessage(JSON.stringify(message))

        //if ($workerIframe.contentWindow.workerChannel)
        //    $workerIframe.contentWindow.workerChannel.renderSvg(qsQuiz.state)

        //return

        if (this.isRendering)
        {
            return;
        }

        this.isRendering = true

        console.log("LOADING")
        this.innerHTML = html`<div>LOADING</div>`

        //await sleep(4000)
        //await expensive()
        //this.innerHTML = html`<div>DONE</div>`

        const svgs = await renderer.renderSvgSeparatePages(qsQuiz.state)
        this.innerHTML = svgs.join("")
        console.log("DONE")

        this.isRendering = false

        /*
        setTimeout(async () =>
        {
            const svgs = await renderSvgSeparatePages(qsQuiz.state)
    
            this.innerHTML = svgs.join("")
            console.log("DONE")
    
            this.isRendering = false
        }, 0)
        */

        /*
        renderSvgSeparatePages(qsQuiz.state).then(svgs =>
        {
            this.innerHTML = svgs.join("")
            console.log("DONE")

            this.isRendering = false
        })
        */

        /*
        window.requestIdleCallback(async () =>
        {
            await sleep(3000)
            console.log("SLEPT")
            await expensive()
            this.innerHTML = html`<div>DONE</div>`

            //const svgs = await renderSvgSeparatePages(qsQuiz.state)
            //this.innerHTML = svgs.join("")
            console.log("DONE")
    
            this.isRendering = false
        }, { timeout: 30000 });
        */
    }

    updateZoom(zoom)
    {
        const zoomStr = zoom == -1
            ? `calc(100% - 16px)`
            : `calc(${zoom / 100.0} * 842px)`

        this.style.setProperty("--qs-preview-zoom", zoomStr)
    }
})
