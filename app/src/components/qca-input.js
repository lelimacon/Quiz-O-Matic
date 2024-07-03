import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-input", class extends QComponent
{
    static observedAttributes =
    [
        "value",
        "title",
        "leading-icon",
        "trailing-icon",
    ]

    constructor()
    {
        super
        ({
            hasEarlyRender: true,
        })

        this.innerHTML =
            html`
            <label>
                <input
                    type="text"
                />
                <span class="icon leadingIcon">
                    <span></span>
                </span>
                <span class="icon trailingIcon">
                    <span></span>
                </span>
            </label>
            `

        this.$label = this.querySelector("label")
        this.$input = this.querySelector("input")        
        this.$leadingIcon = this.querySelector(".leadingIcon span")
        this.$trailingIcon = this.querySelector(".trailingIcon span")

        this.$input.addEventListener("click", (e) => this.isChecked = e.target.value)
    }

    $label = undefined
    $input = undefined
    $leadingIcon = undefined
    $trailingIcon = undefined

    get value() { return this.getAttribute("value") }
    set value(value)
    {
        this.setAttribute("value", value)
        this.$input.value = value

        this.dispatchEvent(new CustomEvent("qe_valueChanged",
        {
            bubbles: false,
            detail: { isChecked: value },
        }))
    }

    get "leading-icon"() { return this.getAttribute("leading-icon") }
    set "leading-icon"(value)
    {
        this.setAttribute("leading-icon", value)

        if (value)
        {
            this.$label.classList.add("hasLeadingIcon")
            this.$leadingIcon.className = `iconoir-${value}`
        }
        else
        {
            this.$label.classList.remove("hasLeadingIcon")
            this.$leadingIcon.className = `iconoir-${value}`
        }
    }

    get "trailing-icon"() { return this.getAttribute("trailing-icon") }
    set "trailing-icon"(value)
    {
        this.setAttribute("trailing-icon", value)

        if (value)
        {
            this.$label.classList.add("hasTrailingIcon")
            this.$trailingIcon.className = `iconoir-${value}`
        }
        else
        {
            this.$label.classList.remove("hasTrailingIcon")
            this.$trailingIcon.className = `iconoir-${value}`
        }
    }
})
