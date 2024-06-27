import { html } from "../lib.js"


window.customElements.define("qom-app", class extends HTMLElement
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
        "subject;category;name;seed;level;length\nmathematics;arithmetics;sharing-is-caring;" + seed + ";5;10"
})
