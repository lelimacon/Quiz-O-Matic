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
            <input
                id="theme"
                name="theme"
                value="${this.theme}"
            />
            `

        this.$mode = this.querySelector("[name='mode']")
        this.$theme = this.querySelector("[name='theme']")

        //qsQuiz.events.subscribe("qe_stateChanged", () => this.render())
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

        qsQuiz.events.subscribe("qe_setMode", (e) =>
        {
            this.$mode.setAttribute("selected-indices", e.mode)
        })
    }
})
