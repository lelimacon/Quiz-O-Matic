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
            html`
            ${qsLibrary.state.isLoading ? html`<p>loading...</p>` : ""}

            <div>
                ${qsLibrary.state.exercises.length === 0
                    ? html`<p>Nothing here</p>`
                    : qsLibrary.state.exercises
                        .map(item => this.renderExercise(item))
                        .join('')
                }
            </div>
            `

        this.querySelectorAll("[name='addItem']").forEach((button, index) =>
        {
            button.addEventListener("click", () =>
            {
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
    }

    renderExercise = (item) =>
        html`
        <qca-ex-info
            code="${item.code}"
            subject="${item.subject}"
            name="${item.name}"
            description="${item.description}"
            tags="${item.tags.join(",")}"
            levelScale="${item.levelScale}"
            supportedLevels="${item.supportedLevels.join(",")}"
            supportedLengths="${item.supportedLengths.join(",")}"
        >
            <qca-ex-info.header-rhs>
                <button name="addItem" aria-label="Add exercise to quiz">
                    <span class="iconoir-plus"></span>
                </button>
            </qca-ex-info.header-rhs>
        </qca-ex-info>
        `
})
