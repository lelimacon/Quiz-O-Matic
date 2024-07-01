import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qcp-app", class extends QComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <div
                class="panel library"
                style="width: 500px;"
            >
                <h1>Library</h1>
                <qco-library-filters
                    lengths="40"
                ></qco-library-filters>
                <qco-library></qco-library>
            </div>

            <div class="separator"></div>

            <div
                class="panel outline"
                style="width: 500px;"
            >
                <h1>Configuration</h1>
                <h1>Outline</h1>
                <qco-outline></qco-outline>
            </div>

            <div class="separator"></div>

            <div
                class="panel preview"
                style="flex-grow: 1"
            >
                <qco-preview></qco-preview>
            </div>
            `
    }
})
