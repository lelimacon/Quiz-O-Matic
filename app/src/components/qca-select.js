import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-select", class extends QComponent
{
    static observedAttributes =
    [
        //"is-multi-select",
        "selected-indices",
        "selected-values",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.$items = [... this.querySelectorAll("qca-select\\.item")]

        this.innerHTML =
            html`
            <qca-input
                class="anchor"
                trailing-icon="arrow-down-tag"
            ></qca-input>
            <div class="body">
            </div>
            `

        this.$body = this.querySelector(".body")
        this.$input = this.querySelector("qca-input")
        this.$anchor = this.querySelector(".anchor")

        for (const $item of this.$items)
        {
            this.$body.appendChild($item)
        }

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

        this.$anchor.addEventListener("click", (e) =>
        {
            const isOpen = !this["is-open"]
            this["is-open"] = isOpen

            // Prevent parent listener from catching event.
            e.stopPropagation()
        })

        this.addEventListener("click", (e) =>
        {
            this["is-open"] = false
        })
    }

    $anchor = undefined
    $body = undefined
    $input = undefined
    $items = []

    get "is-multi-select"() { return this.getAttribute("is-multi-select") === "" || this.getAttribute("is-multi-select") == "true" }

    get "selected-indices"() { return this.getAttribute("selected-indices") }
    set "selected-indices"(value)
    {
        //this.setAttribute("selected-indices", value)

        this.updateSelectedIndices(value.split(",").map(e => parseInt(e)))
    }

    get "selected-values"() { return this.getAttribute("selected-values") }
    set "selected-values"(value)
    {
        //this.setAttribute("selected-indices", value)

        this.updateSelectedValues(value.split(","))
    }

    get "is-open"() { return this.getAttribute("is-open") === "" || this.getAttribute("is-open") === "true" }
    set "is-open"(value)
    {
        this.setAttribute("is-open", value)

        if (value)
        {
            this.$body.setAttribute("open", "")
            this.$input["trailing-icon"] = "arrow-up-tag"
        }
        else
        {
            this.$body.removeAttribute("open")
            this.$input["trailing-icon"] = "arrow-down-tag"
        }

        this.dispatchEvent(new CustomEvent("qe_isOpenChanged",
        {
            bubbles: false,
            detail: { isOpen: value },
        }))
    }

    updateSelectedIndices(selectedIndices)
    {
        this.updateSelection(selectedIndices)

        this.dispatchEvent(new CustomEvent("qe_selectedIndicesChanged",
        {
            bubbles: false,
            detail: { selectedIndices },
        }))
    }

    updateSelectedValues(selectedValues)
    {
        const selectedIndices = this.$items
            .map(($item) => $item.getAttribute("value"))
            .map((value, index) => selectedValues.includes(value) ? index : -1)
            .filter((index) => index >= 0)

        this.updateSelection(selectedIndices)

        this.dispatchEvent(new CustomEvent("qe_selectedValuesChanged",
        {
            bubbles: false,
            detail: { selectedValues },
        }))
    }

    updateSelection(selectedIndices)
    {
        const selectedValues = []
        const selectedLabels = []

        for (let index = 0; index < this.$items.length; index++)
        {
            const $item = this.$items[index]

            const isSelected = selectedIndices.includes(index)

            if (selectedIndices.includes(index))
                $item.classList.add("selected")
            else
                $item.classList.remove("selected")

            if (!isSelected)
                continue

            const value = $item.getAttribute("value")
            const label = $item.getAttribute("label") ?? $item.innerText

            selectedValues.push(value)
            selectedLabels.push(label)
        }

        //console.log("updateSelection", selectedIndices, selectedValues)

        this.$input.value = selectedLabels.join(", ")

        this.dispatchEvent(new CustomEvent("qe_selectionChanged",
        {
            bubbles: false,
            detail: { selectedIndices, selectedValues },
        }))
    }
})
