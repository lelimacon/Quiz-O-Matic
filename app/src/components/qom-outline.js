import { html } from "../lib/utils.js"
import QomComponent from "../lib/QomComponent.js"


window.customElements.define("qom-outline", class extends QomComponent
{
    static observedAttributes =
    [
        "seed",
    ]

    $seed = undefined

    constructor()
    {
        super()

        this.innerHTML =
            html`
            <label for="seed">Seed</label>
            <input
                id="seed"
                name="seed"
                value="${this.seed}"
            />
            `

        this.$seed = this.querySelector("[name='seed']")
    }

    connectedCallback()
    {
        this.$seed.oninput = e =>
        {
            this.seed = e.target.value
        }
    }

    get seed() { return this.getAttribute("seed") ?? "" }
    set seed(value)
    {
        this.setAttribute("seed", value)
        this.$seed.value = value

        this.dispatchEvent(new CustomEvent("outlineChanged",
        {
            bubbles: true,
            detail: { seed: this.seed },
        }))
    }
})
