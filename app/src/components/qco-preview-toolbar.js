import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsPreview from "../store/QsPreview.js"


window.customElements.define("qco-preview-toolbar", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        this.innerHTML =
            html`
            <qca-select
                class="zoom"
                name="zoom"
                title="Zoom level"
                is-multi-select="false"
                selected-values="${qsPreview.state.zoom}"
            >
                <qca-select.item value="-1">Stretch</qca-select.item>
                <qca-select.item value="25">25%</qca-select.item>
                <qca-select.item value="50">50%</qca-select.item>
                <qca-select.item value="75">75%</qca-select.item>
                <qca-select.item value="90">90%</qca-select.item>
                <qca-select.item value="100">100%</qca-select.item>
                <qca-select.item value="120">120%</qca-select.item>
                <qca-select.item value="150">150%</qca-select.item>
                <qca-select.item value="200">200%</qca-select.item>
            </qca-select>
            `

        this.$zoom = this.querySelector(".zoom")
    }

    $zoom = undefined

    connectedCallback()
    {
        this.$zoom.addEventListener("qe_selectionChanged", (e) =>
        {
            const zoom = parseInt(e.detail.selectedValues[0])
            qsPreview.setZoom(zoom)
        })

        qsPreview.events.subscribe("qe_setZoom", (e) =>
        {
            this.$zoom.setAttribute("selected-values", [e.zoom.toString()])
        })
    }
})
