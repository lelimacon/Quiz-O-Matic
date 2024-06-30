import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import qsLibrary from "../store/QsLibrary.js"


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

            <button name="addItem" aria-label="Add new item">add</button>

            <div>
                ${qsLibrary.state.items.length === 0
                    ? html`<p>Nothing here</p>`
                    : qsLibrary.state.items
                        .map(item =>
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
                            `)
                        .join('')
                }
            </div>
            `

        this.querySelector("[name='addItem']").addEventListener("click", () =>
        {
            qsLibrary.addItem({ code: "New Item" })
        })
        this.querySelectorAll("[name='removeItem']").forEach((button, index) =>
        {
            button.addEventListener("click", () =>
            {
                qsLibrary.clearItem(index)
            })
        })
    }
})
