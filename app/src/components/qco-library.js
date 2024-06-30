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

            <ul>
                ${qsLibrary.state.items.length === 0
                    ? html`<p>Nothing here</p>`
                    : qsLibrary.state.items
                        .map(item =>
                            html`
                            <li>
                                ${item.code}
                                <button name="removeItem" aria-label="Delete this item">×</button>
                            </li>
                            `)
                        .join('')
                }
            </ul>
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
