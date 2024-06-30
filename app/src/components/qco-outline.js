import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsOutline from "../store/QsOutline.js"


window.customElements.define("qco-outline", class extends QComponent
{
    static observedAttributes =
    [
        "seed",
    ]

    constructor()
    {
        super
        ({
            store: qsOutline,
        })

        this.innerHTML =
            html`
            <label for="seed">Seed</label>
            <input
                id="seed"
                name="seed"
                value="${this.seed}"
            />
            <div name="exercises"></div>
            `

        this.$seed = this.querySelector("[name='seed']")
        this.$exercises = this.querySelector("[name='exercises']")
    }

    connectedCallback()
    {
        this.$seed.oninput = e =>
        {
            this.seed = e.target.value
        }
    }

    $seed = undefined
    $exercises = undefined

    get seed() { return this.getAttribute("seed") ?? "" }
    set seed(value)
    {
        this.setAttribute("seed", value)
        this.$seed.value = value

        this.dispatchEvent(new CustomEvent("outlineChanged",
        {
            bubbles: true,
            detail: { seed: this.seed },
        }))
    }

    render()
    {
        this.$exercises.innerHTML = qsOutline.state.items.length === 0
            ? html`<p>Add exercises from the library</p>`
            : qsOutline.state.items
                .map(item => this.renderExercise(item))
                .join('')

        this.$exercises.querySelectorAll("[name='removeItem']").forEach((button, index) =>
        {
            button.addEventListener("click", () =>
            {
                qsOutline.clearItem(index)
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
                <button name="removeItem" aria-label="Delete this item">×</button>
            </div>
        </div>
        `
})
