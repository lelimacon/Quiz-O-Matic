import { html } from "../lib/utils.js"
import QomComponent from "../lib/QomComponent.js"
import qsLibrary from "../store/QsLibrary.js"


window.customElements.define("qom-library", class extends QomComponent
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
