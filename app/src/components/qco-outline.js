import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qco-outline", class extends QComponent
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
