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
            <label for="mode0">Mode</label>
            <qca-list
                id="mode0"
                name="mode0"
                is-multi-select="false"
                selected-indices="${qsQuiz.state.mode}"
            >
                <qca-list.item>Questions then Answers</qca-list.item>
                <qca-list.item>Questions with Answers</qca-list.item>
                <qca-list.item>Questions only</qca-list.item>
                <qca-list.item>Answers only</qca-list.item>
            </qca-list>
            <qca-popover>
                <qca-popover.anchor>
                    <qca-input
                        name="modeInput"
                        value=${qsQuiz.state.mode}
                        title="Click to change mode"
                        trailing-icon="arrow-union-vertical"
                    ></qca-input>
                </qca-popover.anchor>
                <qca-popover.body>
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
                </qca-popover.body>
            </qca-popover>

            <label for="theme">Theme</label>
            <input
                id="theme"
                name="theme"
                value="${this.theme}"
            />
            `

        this.$mode = this.querySelector("[name='mode']")
        this.$modeInput = this.querySelector("[name='modeInput']")
        this.$mode0 = this.querySelector("[name='mode0']")
        this.$theme = this.querySelector("[name='theme']")

        //qsQuiz.events.subscribe("qe_stateChanged", () => this.render())
    }

    $mode = undefined
    $modeInput = undefined
    $mode0 = undefined
    $theme = undefined

    connectedCallback()
    {
        this.$mode0.addEventListener("qe_selectedIndicesChanged", (e) =>
        {
            const mode = e.detail.selectedIndices[0]
            qsQuiz.setMode(mode)
        })
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
            //console.log("qe_setMode", e)
            this.$mode.setAttribute("selected-indices", e.mode)
            this.$mode0.setAttribute("selected-indices", e.mode)
            this.$modeInput.value = e.mode
        })
    }
})
