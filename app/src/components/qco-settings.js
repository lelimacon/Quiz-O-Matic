import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qco-settings", class extends QComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <qca-switch
                name="themeSwitch"
                iconOn="moon-sat"
                iconOff="sea-and-sun"
                title="Light switch"
            ></qca-switch>
            `

        this.$themeSwitch = this.querySelector("[name='themeSwitch']")
        this.$themeSwitch.addEventListener("qe_isCheckedChanged", (e) =>
        {
            this.theme = e.detail.isChecked ? "dark" : "light"
        })

    }

    connectedCallback()
    {
        this.theme = "light"
    }

    $themeSwitch = undefined

    /**
     * @param {string} value
     */
    set theme(value)
    {
        this.$themeSwitch.setAttribute("isChecked", value == "dark" ? "true" : "false")

        // Side effect: Change app attributes.
        const $app = document.querySelector("qcp-app")
        $app.classList.remove("theme-light", "theme-dark")
        $app.classList.add(`theme-${value}`)
    }
})
