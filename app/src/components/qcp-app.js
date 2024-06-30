import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qcp-app", class extends QComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <div class="panel library">
                <qco-library-filters
                    name="filters"
                    lengths="40"
                ></qco-library-filters>
                <qco-library></qco-library>
            </div>
            <div class="separator"></div>
            <div class="panel outline">
                <button name="changeSeed">change seed</button>
                <qco-outline seed="42"></qco-outline>
            </div>
            <div class="separator"></div>
            <div class="panel preview">
                <qca-preview data="${this.getData("42")}"></qca-preview>
            </div>
            `

        this.$filters = this.querySelector("[name='filters']")
        this.$outline = this.querySelector("qco-outline")
        this.$preview = this.querySelector("qca-preview")
    }

    $filters = undefined
    $outline = undefined
    $preview = undefined

    connectedCallback()
    {
        this.querySelector("[name='changeSeed']").onclick = () =>
        {
            const seed = parseInt(this.$outline.getAttribute("seed"))
            this.$outline.setAttribute("seed", seed + 1)
        }
        this.addEventListener("outlineChanged", (e) =>
        {
            this.$preview.setAttribute("data", this.getData(e.detail.seed))
        })
    }

    getData = (seed) =>
        `Q_MAT_POP ${seed} 5 2,Q_MAT_SIC ${seed} 5 5`
})
