import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-select", class extends QComponent
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

        this.$items = [... this.querySelectorAll("qca-select\\.item")]

        this.innerHTML =
            html`
            <qca-input
                class="anchor"
                title="Click to change mode"
                trailing-icon="arrow-union-vertical"
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

    _selectedIndices = []

    get "is-multi-select"() { return this.getAttribute("is-multi-select") === "" || this.getAttribute("is-multi-select") == "true" }

    get "selected-indices"() { return this.getAttribute("selected-indices") }
    set "selected-indices"(value)
    {
        this.setAttribute("selected-indices", value)

        this.updateSelectedIndices(value.split(",").map(e => parseInt(e)))
    }

    get "is-open"() { return this.getAttribute("is-open") === "" || this.getAttribute("is-open") === "true" }
    set "is-open"(value)
    {
        this.setAttribute("is-open", value)

        if (value)
        {
            this.$body.setAttribute("open", "")
        }
        else
        {
            this.$body.removeAttribute("open")
        }

        this.dispatchEvent(new CustomEvent("qe_isOpenChanged",
        {
            bubbles: false,
            detail: { isOpen: value },
        }))
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

        const itemLabels = this.$items
            .map(item => item.innerText)
            .filter((item, index) => selectedIndices.includes(index))

        this.$input.value = itemLabels.join(", ")

        this.dispatchEvent(new CustomEvent("qe_selectedIndicesChanged",
        {
            bubbles: false,
            detail: { selectedIndices },
        }))
    }
})
