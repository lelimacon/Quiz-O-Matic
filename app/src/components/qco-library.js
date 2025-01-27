import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsLibrary from "../store/QsLibrary.js"
import qsQuiz from "../store/QsQuiz.js"


window.customElements.define("qco-library", class extends QComponent
{
    constructor()
    {
        super
        ({
        })

        qsLibrary.events.subscribe("qe_stateChanged", () => this.render())
    }

    connectedCallback()
    {
        qsLibrary.load()
    }

    render()
    {
        this.innerHTML =
            qsLibrary.state.isLoading
            ? html`<p>Loading...</p>`
            : html`
            <div class="panelHeader">
                <h1>Library</h1>
            </div>
            <div class="panelBody">
                <!--
                <qco-library-filters></qco-library-filters>
                -->
                <div class="libraryList">
                    ${qsLibrary.state.exercises.length === 0
                        ? html`<p>Nothing here</p>`
                        : this.renderExerciseList(qsLibrary.state.exercises)
                    }
                </div>
                <div class="space"></div>
                <div class="exerciseDetails hidden"></div>
            </div>
            `

        const $exerciseDetails = this.querySelector(".exerciseDetails")

        this.querySelectorAll("[name='addItem']").forEach((button, index) =>
        {
            button.addEventListener("click", (e) =>
            {
                e.stopPropagation();

                const libraryExercise = qsLibrary.state.exercises[index]

                const outlineExercise =
                {
                    // TODO: Only expose uid (source + code or absolute URI) then from sources.
                    ... libraryExercise,

                    seed: Math.floor(Math.random() * 1000),
                    selectedLevel: libraryExercise.defaults.level,
                    selectedLength: libraryExercise.defaults.length,
                }

                qsQuiz.addItem(outlineExercise)
            })
        })

        const $exerciseList = this.querySelector("[name='exerciseList']")

        if ($exerciseList)
        {
            $exerciseList.addEventListener("qe_selectedIndicesChanged", (e) =>
            {
                const index = e.detail.selectedIndices[0]

                // Unselected.
                if (!index)
                {
                    this.selectedExercise = undefined
                    $exerciseDetails.classList.add("hidden")
                    return
                }

                const exercise = qsLibrary.state.exercises[index]
                $exerciseDetails.innerHTML = this.renderExerciseDetails(exercise)
                $exerciseDetails.classList.remove("hidden")
            })
        }
    }

    renderExerciseList = (exercises) =>
        html`
        <qca-list
            id="exerciseList"
            name="exerciseList"
            is-multi-select="false"
            can-unselect="true"
        >
            ${exercises
                .map(exercise =>
                html`
                <qca-list.item value="0" class="libraryRow">
                    <div class="name">${exercise.name}</div>
                    <div class="space"></div>
                    <div class="actions">
                        <button name="addItem" aria-label="Add exercise to quiz">
                            <span class="iconoir-plus"></span>
                        </button>
                    </div>
                </qca-list.item>
                `
                )
                .join('')}
        </qca-list>
        `

    renderExerciseRow = (exercise) =>
        html`
        <div class="libraryRow">
            <div class="name">${exercise.name}</div>
            <div class="space"></div>
            <div class="actions">
                <button name="addItem" aria-label="Add exercise to quiz">
                    <span class="iconoir-plus"></span>
                </button>
            </div>
        </div>
        `

    renderExerciseDetails = (exercise) =>
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
        >
        </qca-ex-info>
        `
})
