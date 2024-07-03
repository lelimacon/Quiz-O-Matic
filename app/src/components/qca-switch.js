import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-switch", class extends QComponent
{
    static observedAttributes =
    [
        "width",
        "height",
        "isChecked",
        "iconOn",
        "iconOff",
    ]

    constructor()
    {
        super()
    }

    $knobIcon = undefined

    get width() { return this.getAttribute("width") || "48px" }
    set width(value)
    {
        this.setAttribute("width", value)
        this.render()
    }

    get height() { return this.getAttribute("height") || "26px" }
    set height(value)
    {
        this.setAttribute("height", value)
        this.render()
    }

    get isChecked() { return this.getAttribute("isChecked") === "true" }
    set isChecked(value)
    {
        this.setAttribute("isChecked", value)
        this.renderIcon()

        this.dispatchEvent(new CustomEvent("qe_isCheckedChanged",
        {
            bubbles: false,
            detail: { isChecked: value },
        }))
    }

    get iconOn() { return this.getAttribute("iconOn") }
    set iconOn(value)
    {
        this.setAttribute("iconOn", value)
        this.renderIcon()
    }

    get iconOff() { return this.getAttribute("iconOff") }
    set iconOff(value)
    {
        this.setAttribute("iconOff", value)
        this.renderIcon()
    }

    render()
    {
        this.innerHTML =
            html`
            <label>
                <input type="checkbox">
                <span class="slider">
                    <span class="knob">
                        <span></span>
                    </span>
                </span>
            </label>
            `

        this.style.setProperty("--qca-switch-width", this.width)
        this.style.setProperty("--qca-switch-height", this.height)

        const $theme = this.querySelector("input")
        $theme.addEventListener("click", () => this.isChecked = $theme.checked)

        this.$knobIcon = this.querySelector(".knob span")
        this.renderIcon()
    }

    renderIcon()
    {
        this.$knobIcon.className = "iconoir-" + (this.isChecked ? this.iconOn : this.iconOff)
    }
})
