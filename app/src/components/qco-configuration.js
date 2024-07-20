import metadata from "../metadata.js"
import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsQuiz from "../store/QsQuiz.js"


window.customElements.define("qco-configuration", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        this.innerHTML =
            html`
            <label for="mode">Mode</label>
            <qca-select
                id="mode"
                name="mode"
                is-multi-select="false"
                selected-indices="${qsQuiz.state.mode}"
            >
                <qca-select.item value="0">Questions then Answers</qca-select.item>
                <qca-select.item value="1">Questions with Answers</qca-select.item>
                <qca-select.item value="2">Questions only</qca-select.item>
                <qca-select.item value="3">Answers only</qca-select.item>
            </qca-select>

            <label for="theme">Theme</label>
            <qca-select
                id="theme"
                name="theme"
                is-multi-select="false"
                selected-values="${qsQuiz.state.theme.code}"
            >
                ${
                    metadata.themes.map(theme =>
                        html`
                        <qca-select.item
                            value="${theme.code}"
                            label="${theme.name}"
                        >
                            <div class="name">${theme.name}</div>
                            <div class="description">${theme.description}</div>
                            <div class="tags">
                                ${
                                    theme.tags
                                        .split(",")
                                        .map(tag => html`<div class="tag">${tag}</div>`)
                                        .join("")
                                }
                            </div>
                        </qca-select.item>`
                    )
                }
            </qca-select>
            `

        this.$mode = this.querySelector("[name='mode']")
        this.$theme = this.querySelector("[name='theme']")

        //qsQuiz.events.subscribe("qe_stateChanged", () => this.render())
    }

    $mode = undefined
    $theme = undefined

    connectedCallback()
    {
        this.$mode.addEventListener("qe_selectionChanged", (e) =>
        {
            //console.log("qe_selectedIndicesChanged", e)
            const mode = e.detail.selectedIndices[0]
            qsQuiz.setMode(mode)
        })
        this.$theme.addEventListener("qe_selectionChanged", (e) =>
        {
            const code = e.detail.selectedValues[0]
            const options = {}
            qsQuiz.setTheme(code, options)
        })

        qsQuiz.events.subscribe("qe_setMode", (e) =>
        {
            this.$mode.setAttribute("selected-indices", e.mode)
        })
        qsQuiz.events.subscribe("qe_setTheme", (e) =>
        {
            this.$mode.setAttribute("selected-value", e.theme)
        })
    }
})
