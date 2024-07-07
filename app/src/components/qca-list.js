import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-list", class extends QComponent
{
    static observedAttributes =
    [
        //"is-multi-select",
        "selected-indices",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.$items = this.querySelectorAll("qca-list\\.item")

        this.$items.forEach(($item, index) =>
        {
            $item.addEventListener("click", (e) =>
            {
                const selectedIndices = !this["is-multi-select"]
                    ? [index]
                    : this._selectedIndices.includes(index)
                    ? this._selectedIndices.filter(i => i != index)
                    : this._selectedIndices.concat([index])

                this.updateSelectedIndices(selectedIndices)
            })
        })
    }

    $items = []

    _selectedIndices = []

    get "is-multi-select"() { return this.getAttribute("is-multi-select") == "true" }

    get "selected-indices"() { return this.getAttribute("selected-indices") }
    set "selected-indices"(value)
    {
        this.setAttribute("selected-indices", value)

        this.updateSelectedIndices(value.split(",").map(e => parseInt(e)))
    }

    updateSelectedIndices(selectedIndices)
    {
        this._selectedIndices = selectedIndices

        this.$items.forEach(($item, index) =>
        {
            if (selectedIndices.includes(index))
                $item.classList.add("selected")
            else
                $item.classList.remove("selected")
        })

        this.dispatchEvent(new CustomEvent("qe_selectedIndicesChanged",
        {
            bubbles: false,
            detail: { selectedIndices },
        }))
    }
})
