import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsLibrary from "../store/QsLibrary.js"
import qsOutline from "../store/QsOutline.js"


window.customElements.define("qco-library", class extends QComponent
{
    constructor()
    {
        super
        ({
            store: qsLibrary,
        })
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
                ${qsLibrary.state.items.length === 0
                    ? html`<p>Nothing here</p>`
                    : qsLibrary.state.items
                        .map(item => this.renderExercise(item))
                        .join('')
                }
            </div>
            `

        this.querySelectorAll("[name='addItem']").forEach((button, index) =>
        {
            button.addEventListener("click", () =>
            {
                const libraryExercise = qsLibrary.state.items[index]

                const outlineExercise =
                {
                    ...libraryExercise,

                    seed: Math.floor(Math.random() * 1000),
                    selectedLevel: libraryExercise.supportedLevels.split(",")[0],
                    selectedLength: libraryExercise.supportedLengths.split(",")[0],
                }

                qsOutline.addItem(outlineExercise)
            })
        })
    }

    renderExercise = (item) =>
        html`
        <div class="libraryRowContainer">
            <div class="libraryRowInfo">
                <qca-test></qca-test>
                <qca-ex-info
                    code="${item.code}"
                    subject="${item.subject}"
                    name="${item.name}"
                    description="${item.description}"
                    tags="${item.tags}"
                    levelScale="${item.levelScale}"
                    supportedLevels="${item.supportedLevels}"
                    supportedLengths="${item.supportedLengths}"
                ></qca-ex-info>
            </div>
            <div class="libraryRowActions">
                <button name="addItem" aria-label="Add item to library">+</button>
            </div>
        </div>
        `
})