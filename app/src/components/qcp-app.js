import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qcp-app", class extends QComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <div
                class="panel library"
                style="width: 500px;"
            >
                <qca-switch
                    name="themeSwitch"
                    iconOn="moon-sat"
                    iconOff="sea-and-sun"
                    title="Light switch"
                ></qca-switch>

                <h1>Library</h1>
                <qco-library-filters
                    lengths="40"
                ></qco-library-filters>
                <qco-library></qco-library>
            </div>

            <div class="separator"></div>

            <div
                class="panel outline"
                style="width: 500px;"
            >
                <h1>Configuration</h1>
                <h1>Outline</h1>
                <qco-outline></qco-outline>
            </div>

            <div class="separator"></div>

            <div
                class="panel preview"
                style="flex-grow: 1"
            >
                <qco-preview></qco-preview>
            </div>
            `

        this.$themeSwitch = this.querySelector("[name='themeSwitch']")
        this.$themeSwitch.addEventListener("qe_isCheckedChanged", (e) =>
        {
            this.theme = e.detail.isChecked ? "dark" : "light"
        })

        this.theme = "light"
    }

    $theme = undefined
    $themeSwitch = undefined

    get theme() { return this.getAttribute("theme") ?? "" }
    set theme(value)
    {
        this.setAttribute("theme", value)

        this.classList.remove("theme-light", "theme-dark")
        this.classList.add(`theme-${value}`)
        this.$themeSwitch.setAttribute("isChecked", value == "dark" ? "true" : "false")
    }
})
