import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-popover", class extends QComponent
{
    static observedAttributes =
    [
        "is-open",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.$anchor = this.querySelector("qca-popover\\.anchor")
        this.$body = this.querySelector("qca-popover\\.body")

        this.$anchor.addEventListener("click", (e) =>
        {
            const isOpen = !this["is-open"]
            this["is-open"] = isOpen

            e.stopPropagation()
        })

        this.addEventListener("click", (e) =>
        {
            this["is-open"] = false
        })
    }

    $anchor = undefined
    $body = undefined

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
})
