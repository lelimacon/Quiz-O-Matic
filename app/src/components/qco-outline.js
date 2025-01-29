import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsQuiz from "../store/QsQuiz.js"


window.customElements.define("qco-outline", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        qsQuiz.events.subscribe("qe_stateChanged", (_) => this._refreshList())

        this.innerHTML =
            html`
            <div class="panelHeader">
                <h1>Outline</h1>
            </div>
            <div class="panelBody">
            </div>
            <div class="space"></div>
            <div class="exerciseDetails hidden"></div>
            `

        this.$panelBody = this.querySelector(".panelBody")
    }

    selectedIndex = undefined
    $panelBody = undefined

    _refreshList()
    {
        this.$panelBody.innerHTML = qsQuiz.state.exercises.length === 0
            ? html`<p>Add exercises from the library</p>`
            : this._renderExerciseList(qsQuiz.state.exercises)

        this.$panelBody.querySelectorAll("[name='removeExercise']").forEach(($button, index) =>
        {
            $button.addEventListener("click", () =>
            {
                qsQuiz.clearItem(index)
            })
        })

        this._hideDetails()

        const $exerciseList = this.querySelector("[name='exerciseList']")

        if ($exerciseList)
        {
            $exerciseList.addEventListener("qe_selectedIndicesChanged", (e) =>
            {
                this.selectedIndex = e.detail.selectedIndices[0]

                // Unselected.
                if (this.selectedIndex === undefined)
                {
                    this._hideDetails()
                }

                this._showDetails()
            })
        }
    }

    _hideDetails = () =>
    {
        const $exerciseDetails = this.querySelector(".exerciseDetails")
        $exerciseDetails.classList.add("hidden")
        return
    }

    _showDetails = () =>
    {
        const index = this.selectedIndex
        const exercise = qsQuiz.state.exercises[index]
        const $exerciseDetails = this.querySelector(".exerciseDetails")

        $exerciseDetails.innerHTML = this._renderExerciseDetails(exercise, index)
        $exerciseDetails.classList.remove("hidden")

        $exerciseDetails.querySelector("[name='seed']").oninput = e =>
        {
            const seed = parseInt(e.target.value)
            qsQuiz.changeSeed(index, seed)
        }
        $exerciseDetails.children[0].addEventListener("qe_selectedLengthChanged", (e) =>
        {
            console.log(e)
            qsQuiz.changeLength(index, e.detail.value)
        })
        $exerciseDetails.children[0].addEventListener("qe_selectedLevelChanged", (e) =>
        {
            qsQuiz.changeLevel(index, e.detail.value)
        })
    }

    _renderExerciseList = (exercises) =>
        html`
        <qca-list
            class="exerciseList"
            name="exerciseList"
            is-multi-select="false"
            can-unselect="true"
        >
            ${exercises
                .map((exercise, index) =>
                    html`
                    <qca-list.item value="0" class="row">
                        <div class="index">#${index + 1}</div>
                        <div class="name">${exercise.name}</div>
                        <div class="space"></div>
                        <div class="actions">
                            <button name="removeExercise" aria-label="Remove exercise from quiz">
                                <span class="iconoir-xmark"></span>
                            </button>
                        </div>
                    </qca-list.item>
                    `
                )
                .join('')}
        </qca-list>
        `

    _renderExerciseDetails = (exercise) =>
        html`
        <qca-ex-info
            code="${exercise.code}"
            subject="${exercise.subject}"
            name="${exercise.name}"
            description="${exercise.description}"
            tags="${exercise.tags.join(",")}"
            levelScale="${exercise.levelScale}"
            supportedLevels="${exercise.supportedLevels.join(",")}"
            supportedLengths="${exercise.supportedLengths.join(",")}"
            selectedLevel="${exercise.selectedLevel}"
            selectedLength="${exercise.selectedLength}"
            isInteractive="true"
        >
            <qca-ex-info.header-rhs>
                <qca-input
                    name="seed"
                    value=${exercise.seed}
                    title="Seed (random component)"
                    leading-icon="dice-${digitToText(exercise.seed % 6 + 1)}"
                ></qca-input>
                <div class="separator"></div>
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