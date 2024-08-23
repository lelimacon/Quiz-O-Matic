import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-color-picker", class extends QComponent
{
    static observedAttributes =
    [
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
            <qca-popover>
                <qca-popover.anchor>
                    <qca-input
                        class="anchor"
                        leading-icon="droplet-solid"
                    ></qca-input>
                </qca-popover.anchor>
                <qca-popover.body>
                    <div id="picker"></div>
                </qca-popover.body>
            </qca-popover>
            `

        this.$popover = this.querySelector("qca-popover")
        this.$input = this.querySelector("qca-input")
        this.$body = this.querySelector("qca-popover\\.body")

        const $colorPicker = this.querySelector("#picker")
        this._joe = colorjoe.rgb($colorPicker, "#ff88aa", [])

        this._joe.on("change", color =>
        {
            const hex = color.hex()
            this._value_set(hex)
        })

        this.$input.addEventListener("click", (e) =>
        {
            this._isOpen_set(true)

            // Prevent parent listener from catching event.
            e.stopPropagation()
        })

        this.$body.addEventListener("click", (e) =>
        {
            // Prevent parent listener from catching event.
            e.stopPropagation()
        })
    }

    $popover = undefined
    $input = undefined
    $body = undefined
    _joe = undefined

    _value = null
    get value() { return this._value }
    set value(value)
    {
        // Setting joe will bounce back to _value_set.
        this._joe.set(value)
    }
    _value_set = (value) =>
    {
        this._value = value
        this.$input.value = value
        this.$input.style.setProperty("--leading-icon-color", value)

        this.dispatchEvent(new CustomEvent("qe_valueChanged",
        {
            bubbles: false,
            detail: { value: value },
        }))
    }

    get isOpen() { return this.$popover["is-open"] }
    set isOpen(value)
    {
        this.$popover["is-open"] = value
    }
    _isOpen_set = (value) =>
    {
        this.$popover["is-open"] = value

        this.dispatchEvent(new CustomEvent("qe_isOpenChanged",
        {
            bubbles: false,
            detail: { isOpen: value },
        }))
    }
})
