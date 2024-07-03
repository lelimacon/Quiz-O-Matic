import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsOutline from "../store/QsOutline.js"


window.customElements.define("qco-outline", class extends QComponent
{
    static observedAttributes =
    [
        "theme",
    ]

    constructor()
    {
        super
        ({
            store: qsOutline,
        })

        this.innerHTML =
            html`
            <label for="theme">Theme</label>
            <input
                id="theme"
                name="theme"
                value="${this.theme}"
            />
            <div name="exercises"></div>
            `

        this.$theme = this.querySelector("[name='theme']")
        this.$exercises = this.querySelector("[name='exercises']")
    }

    connectedCallback()
    {
        this.$theme.oninput = e =>
        {
            this.theme = e.target.value
        }
    }

    $theme = undefined
    $exercises = undefined

    get theme() { return this.getAttribute("theme") ?? "" }
    set theme(value)
    {
        this.setAttribute("theme", value)
        this.$theme.value = value
    }

    render()
    {
        this.$exercises.innerHTML = qsOutline.state.items.length === 0
            ? html`<p>Add exercises from the library</p>`
            : qsOutline.state.items
                .map((item, i) => this.renderExercise(item, i + 1))
                .join('')

        this.$exercises.querySelectorAll("[name='seed']").forEach(($input, index) =>
        {
            $input.oninput = e =>
            {
                console.log("SEED INPUT", e)
                qsOutline.changeSeed(index, e.target.value)
            }
        })
        this.$exercises.querySelectorAll("[name='removeExercise']").forEach(($button, index) =>
        {
            $button.addEventListener("click", () =>
            {
                qsOutline.clearItem(index)
            })
        })

        let index = 0
        for (const $exercise of this.$exercises.children)
        {
            const currentIndex = index
            $exercise.addEventListener("qe_selectedLengthChanged", (e) =>
            {
                qsOutline.changeLength(currentIndex, e.detail.value)
            })
            $exercise.addEventListener("qe_selectedLevelChanged", (e) =>
            {
                qsOutline.changeLevel(currentIndex, e.detail.value)
            })
            index++
        }
    }

    renderExercise = (exercise, index) =>
        html`
        <qca-ex-info
            code="${exercise.code}"
            subject="${exercise.subject}"
            name="${exercise.name}"
            description="${exercise.description}"
            tags="${exercise.tags}"
            levelScale="${exercise.levelScale}"
            supportedLevels="${exercise.supportedLevels}"
            supportedLengths="${exercise.supportedLengths}"
            selectedLevel="${exercise.selectedLevel}"
            selectedLength="${exercise.selectedLength}"
            isInteractive="true"
        >
            <qca-ex-info.header-lhs>
                <div class="index">#${index}</div>
            </qca-ex-info.header-lhs>
            <qca-ex-info.header-rhs>
                <qca-input
                    name="seed"
                    value=${exercise.seed}
                    title="Seed (random component)"
                    leading-icon="dice-${digitToText(exercise.seed % 6 + 1)}"
                ></qca-input>
                <div class="separator"></div>
                <button name="removeExercise" aria-label="Remove exercise from quiz">
                    <span class="iconoir-xmark"></span>
                </button>
            </qca-ex-info.header-rhs>
        </qca-ex-info>
        `
})

const digitToText = (digit) =>
{
    switch(digit)
    {
        case 1: return "one"
        case 2: return "two"
        case 3: return "three"
        case 4: return "four"
        case 5: return "five"
        case 6: return "six"
    }
}