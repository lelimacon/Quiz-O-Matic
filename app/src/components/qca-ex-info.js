import { subjects, lengths } from "../lib/constants.js"
import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-ex-info", class extends QComponent
{
    static observedAttributes =
    [
        "code",
        "subject",
        "name",
        "description",
        "tags",
        "levelScale",
        "supportedLevels",
        "supportedLengths",
    ]

    constructor()
    {
        super()
    }

    get code() { return this.getAttribute("code") ?? "" }
    get subject() { return this.getAttribute("subject") ?? "" }
    get name() { return this.getAttribute("name") ?? "" }
    get description() { return this.getAttribute("description") ?? "" }
    get tags() { return this.getAttribute("tags") ?? "" }
    get levelScale() { return this.getAttribute("levelScale") ?? "" }
    get supportedLevels() { return this.getAttribute("supportedLevels") ?? "" }
    get supportedLengths() { return this.getAttribute("supportedLengths") ?? "" }

    render()
    {
        this.innerHTML =
            html`
            <div class="header">
                <div class="subject">${subjects[this.subject]}</div>
                <div class="separator">/</div>
                <div class="code">${this.code}</div>
                <div class="space"></div>
                <div class="supportedLengths">
                    ${this.supportedLengths
                        .split(",")
                        .map(strLength => { return { label: strLength, minutes: lengths[strLength] } })
                        .map(o => html`<span title="${o.label} ≈ ${o.minutes} minutes">${o.minutes}'</span>`)
                        .join(" | ")}
                </div>
                <div class="separator">•</div>
                <div class="supportedLevels">
                    ${this.supportedLevels
                        .split(",")
                        .join(" | ")}
                </div>
            </div>
            <div class="name">${this.name}</div>
            <div class="description">${this.description}</div>
            <div class="tags">
                ${this.tags
                    .split(",")
                    .map(tag => html`<span class="tag">${tag}</span>`)
                    .join("")}
            </div>
            `
    }
})
