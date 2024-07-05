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
            <qca-list
                id="mode"
                name="mode"
                is-multi-select="false"
                selected-indices="${qsQuiz.state.mode}"
            >
                <qca-list.item>Questions then Answers</qca-list.item>
                <qca-list.item>Questions with Answers</qca-list.item>
                <qca-list.item>Questions only</qca-list.item>
                <qca-list.item>Answers only</qca-list.item>
            </qca-list>
            <label for="theme">Theme</label>
            <input
                id="theme"
                name="theme"
                value="${this.theme}"
            />
            `

        this.$mode = this.querySelector("qca-list")
        this.$theme = this.querySelector("[name='theme']")

        //qsQuiz.events.subscribe("stateChanged", () => this.render())
    }

    $mode = undefined
    $theme = undefined

    connectedCallback()
    {
        this.$mode.addEventListener("qe_selectedIndicesChanged", (e) =>
        {
            //console.log("qe_selectedIndicesChanged", e)
            const mode = e.detail.selectedIndices[0]
            qsQuiz.setMode(mode)
        })
        this.$theme.oninput = e =>
        {
            qsQuiz.setTheme(e.target.value)
        }
    }
})
