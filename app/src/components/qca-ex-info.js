import { elementFromHTML } from "../lib/utils.js"
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
        "selectedLevels",
        "selectedLengths",
    ]

    constructor()
    {
        super()

        for (const $child of this.children)
        {
            if ($child.tagName === "QCA-EX-INFO.HEADER-LHS")
            {
                for (const $item of $child.childNodes)
                    this.$headerLhs.push($item)
            }
            else if ($child.tagName === "QCA-EX-INFO.HEADER-RHS")
            {
                for (const $item of $child.childNodes)
                    this.$headerRhs.push($item)
            }
        }
    }

    $headerLhs = []
    $headerRhs = []

    get isInteractive() { return this.getAttribute("isInteractive") === "true" }
    get code() { return this.getAttribute("code") ?? "" }
    get subject() { return this.getAttribute("subject") ?? "" }
    get name() { return this.getAttribute("name") ?? "" }
    get description() { return this.getAttribute("description") ?? "" }
    get tags() { return this.getAttribute("tags") ?? "" }
    get levelScale() { return this.getAttribute("levelScale") ?? "" }
    get supportedLevels() { return this.getAttribute("supportedLevels") ?? "" }
    get supportedLengths() { return this.getAttribute("supportedLengths") ?? "" }

    get selectedLevel() { return this.getAttribute("selectedLevel") ?? "" }
    set selectedLevel(value)
    {
        this.setAttribute("selectedLevel", value)

        this.dispatchEvent(new CustomEvent("qe_selectedLevelChanged",
        {
            bubbles: false,
            detail: { value },
        }))
    }

    get selectedLength() { return this.getAttribute("selectedLength") ?? "" }
    set selectedLength(value)
    {
        this.setAttribute("selectedLength", value)

        this.dispatchEvent(new CustomEvent("qe_selectedLengthChanged",
        {
            bubbles: false,
            detail: { value },
        }))
    }

    render()
    {
        this.innerHTML =
            html`
            <div class="header">
                <div class="code">${this.code}</div>
                <div class="space"></div>
                <span class="iconoir-timer"></span>
                <div class="supportedLengths"></div>
                <div class="separator"></div>
                <span class="iconoir-hammer"></span>
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
                `
            )
            $lengths.append($length)

            if (this.isInteractive)
            {
                $length.addEventListener("click", () => this.selectedLength = length)
            }
        }

        const $levels = this.querySelector(".supportedLevels")
        for (const level of this.supportedLevels.split(","))
        {
            const selectedCss = this.selectedLevel == level ? " selected" : ""
            const $level = elementFromHTML(
                html`
                <span class="selectable${selectedCss}">${level}</span>
                `
            )
            $levels.append($level)

            if (this.isInteractive)
            {
                $level.addEventListener("click", () => this.selectedLevel = level)
            }
        }

        const $header = this.querySelector(".header")

        const $firstItem = $header.children[0]
        for (const $item of this.$headerLhs)
        {
            $header.insertBefore($item, $firstItem)
        }

        for (const $item of this.$headerRhs)
        {
            $header.appendChild($item)
        }
    }
})
