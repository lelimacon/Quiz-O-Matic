import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-tabs", class extends QComponent
{
    static observedAttributes =
    [
        "orientation",
        "selected-index",
        "can-unselect",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.$tabs = this.querySelectorAll("qca-tabs\\.tab")

        this.$tabs.forEach(($tab, index) =>
        {
            $tab.addEventListener("click", (e) =>
            {
                const shouldUnselect = this["can-unselect"] && index == this._selectedIndex
                const selectedIndex = shouldUnselect ? null : index

                //this["selected-index"] = selectedIndex
                if (selectedIndex === null)
                {
                    this.removeAttribute("selected-index")
                }
                else
                {
                    this.setAttribute("selected-index", selectedIndex)
                }
                this._updateSelectedIndex(selectedIndex)
            })
        })
    }

    $tabs = []

    _selectedIndex = undefined

    get "orientation"() { return this.getAttribute("orientation") }

    get "selected-index"() { return this.getAttribute("selected-index") }
    set "selected-index"(value)
    {
        //this.setAttribute("selected-index", value)
        const selectedIndex = value === null ? null : parseInt(value)
        this._updateSelectedIndex(selectedIndex)
    }

    get "can-unselect"() { return this.getAttribute("can-unselect") === "true" }

    _updateSelectedIndex(selectedIndex)
    {
        this._selectedIndex = selectedIndex

        this.$tabs.forEach(($tab, index) =>
        {
            if (index === selectedIndex)
                $tab.classList.add("selected")
            else
                $tab.classList.remove("selected")
        })

        this.dispatchEvent(new CustomEvent("qe_selectedIndexChanged",
        {
            bubbles: false,
            detail: { selectedIndex },
        }))
    }
})
