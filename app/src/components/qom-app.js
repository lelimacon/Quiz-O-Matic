import { html } from "../lib/utils.js"
import QomComponent from "../lib/QomComponent.js"


window.customElements.define("qom-app", class extends QomComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <div class="panel library">
                <qom-library-filters
                    name="filters"
                    lengths="40"
                ></qom-library-filters>
                <qom-library></qom-library>
            </div>
            <div class="separator"></div>
            <div class="panel outline">
                <button name="changeSeed">change seed</button>
                <qom-outline seed="42"></qom-outline>
            </div>
            <div class="separator"></div>
            <div class="panel preview">
                <qom-preview data="${this.getData("42")}"></qom-preview>
            </div>
            `

        this.$filters = this.querySelector("[name='filters']")
        this.$outline = this.querySelector("qom-outline")
        this.$preview = this.querySelector("qom-preview")
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
