import { QomElement, html } from "../lib.js"


window.customElements.define("qom-library-filters", class extends QomElement
{
    static observedAttributes =
    [
        "filter",
        "lengths",
    ]

    constructor()
    {
        super()

        this.innerHTML =
            html`
            <label for="filter">Filter</label>
            <input
                id="filter"
                name="filter"
                value="${this.filter}"
            />

            <label for="lengths">Length</label>
            <input
                id="lengths"
                name="lengths"
                value="${this.lengths}"
            />
            `

        this.$filter = this.querySelector("[name='filter']")
        this.$lengths = this.querySelector("[name='lengths']")
    }

    $filter = undefined
    $lengths = undefined

    get filter() { return this.getAttribute("filter") ?? "" }
    set filter(value)
    {
        this.setAttribute("filter", value)
        this.$filter.setAttribute("value", value)

        this.dispatchEvent(new CustomEvent("filterChanged",
        {
            bubbles: true,
            detail: { filter: value },
        }))
    }

    get lengths() { return this.getAttribute("lengths") ?? "" }
    set lengths(value)
    {
        this.setAttribute("lengths", value)
        this.$lengths.setAttribute("value", value)

        this.dispatchEvent(new CustomEvent("lengthsChanged",
        {
            bubbles: true,
            detail: { lengths: value },
        }))
    }
})
