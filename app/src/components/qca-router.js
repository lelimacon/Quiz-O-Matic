import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-router", class extends QComponent
{
    static observedAttributes =
    [
        "selected-route",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.$pages = this.querySelectorAll("qca-router\\.page")
    }

    $pages = []

    get "selected-route"() { return this.getAttribute("selected-route") }
    set "selected-route"(value)
    {
        //this.setAttribute("selected-route", value)

        this.$pages.forEach(($page) =>
        {
            const matchRoute = $page.getAttribute("match-route")
            if (value === matchRoute)
            {
                $page.classList.add("active")
                $page.classList.remove("hidden")
            }
            else
            {
                $page.classList.remove("active")
                $page.classList.add("hidden")
            }
        })

        this.dispatchEvent(new CustomEvent("qe_selectedRouteChanged",
        {
            bubbles: false,
            detail: { selectedRoute: value },
        }))
    }
})
