import { elementFromHTML } from "../lib/utils.js"
import { subjects, lengths } from "../lib/constants.js"
import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


window.customElements.define("qca-ex-info", class extends QComponent
{
    static observedAttributes =
    [
        "index",
        "code",
        "subject",
        "name",
        "description",
        "tags",
        "levelScale",
        "supportedLevels",
        "supportedLengths",
        "selectedLevels",
        "selectedLengths",
    ]

    constructor()
    {
        super()

        for (const $child of this.children)
        {
            if ($child.tagName === "QCA-EX-INFO.ACTION")
            {
                this.actions.push($child)
            }
        }
    }

    actions = []

    get index() { return this.getAttribute("index") ?? "" }
    get code() { return this.getAttribute("code") ?? "" }
    get subject() { return this.getAttribute("subject") ?? "" }
    get name() { return this.getAttribute("name") ?? "" }
    get description() { return this.getAttribute("description") ?? "" }
    get tags() { return this.getAttribute("tags") ?? "" }
    get levelScale() { return this.getAttribute("levelScale") ?? "" }
    get supportedLevels() { return this.getAttribute("supportedLevels") ?? "" }
    get supportedLengths() { return this.getAttribute("supportedLengths") ?? "" }
    get selectedLevel() { return this.getAttribute("selectedLevel") ?? "" }
    get selectedLength() { return this.getAttribute("selectedLength") ?? "" }

    render()
    {
        this.innerHTML =
            html`
            <div class="header">
                ${!this.index ? "" :
                    html`<div class="index">#${this.index}</div>`
                }
                <div class="code">${this.code}</div>
                <div class="space"></div>
                <div class="supportedLengths"></div>
                <div class="separator">•</div>
                <div class="supportedLevels"></div>
            </div>
            <div class="body">
                <div class="name">${this.name}</div>
                <div class="description">${this.description}</div>
                <div class="tags">
                    <span class="tag" title="Subject">${subjects[this.subject]}</span
                    >${this.tags
                        .split(",")
                        .map(tag => html`<span class="tag">${tag}</span>`)
                        .join("")}
                </div>
            </div>
            `

        const $lengths = this.querySelector(".supportedLengths")
        for (const length of this.supportedLengths.split(","))
        {
            const minutes = lengths[length]
            const selectedCss = this.selectedLength == length ? " selected" : ""
            const $length = elementFromHTML(
                html`
                <span
                    class="selectable${selectedCss}"
                    title="${length} ≈ ${minutes} minutes"
                >${minutes}'</span>
                `)
            $lengths.append($length)
        }

        const $levels = this.querySelector(".supportedLevels")
        for (const level of this.supportedLevels.split(","))
        {
            const selectedCss = this.selectedLevel == level ? " selected" : ""
            const $level = elementFromHTML(
                html`
                <span class="selectable${selectedCss}">${level}</span>
                `)
            $levels.append($level)
        }

        for (const action of this.actions)
        {
            this.querySelector(".header").append(action)
        }
    }
})
