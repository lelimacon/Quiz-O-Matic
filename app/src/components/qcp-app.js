import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import sources from "../sources.js"
import renderer from "../lib/renderer.js"


const routes =
{
    library: "library",
    options: "options",
    outline: "outline",
    preview: "preview",
    download: "download",
    settings: "settings",
}

window.customElements.define("qcp-app", class extends QComponent
{
    constructor()
    {
        super()

        this.innerHTML =
            html`
            <div class="drawer">

                <div class="header" title="Quiz-O-Matic">
                    <img class="logo" alt="Logo" src="logo.svg">
                    <span class="title">Quiz-O-Matic</span>
                </div>

                <qca-tabs
                    orientation="horizontal"
                    selected-index="0"
                    can-unselect="true"
                >
                    <qca-tabs.tab
                        name="${routes.library}"
                        title="Library"
                    >
                        <span class="tabIcon iconoir-book-stack"></span>
                        <div class="tabTitle">Library</div>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.outline}"
                        title="Outline"
                    >
                        <span class="tabIcon iconoir-numbered-list-left"></span>
                        <div class="tabTitle">Outline</div>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.options}"
                        title="options"
                    >
                        <span class="tabIcon iconoir-okrs"></span>
                        <div class="tabTitle">Options</div>
                    </qca-tabs.tab>
                    <!--
                    <qca-tabs.tab
                        name="${routes.preview}"
                        title="Preview"
                    >
                        <span class="iconoir-page-flip"></span>
                    </qca-tabs.tab>
                    -->
                    <qca-tabs.tab
                        name="${routes.download}"
                        title="Download"
                    >
                        <span class="tabIcon iconoir-download"></span>
                        <div class="tabTitle">Download</div>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.settings}"
                        title="Settings"
                    >
                        <span class="tabIcon iconoir-settings"></span>
                        <div class="tabTitle">Settings</div>
                    </qca-tabs.tab>
                </qca-tabs>

                <qca-router selected-route="${routes.library}">
                    <qca-router.page match-route="${routes.library}">
                        <qco-library></qco-library>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.outline}">
                        <qco-outline></qco-outline>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.options}">
                        <qco-options></qco-options>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.preview}">
                        <h1>Preview (TODO: mobile only)</h1>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.download}">
                        <qco-downloads></qco-downloads>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.settings}">
                        <qco-settings></qco-settings>
                    </qca-router.page>
                </qca-router>

            </div>

            <div class="content">

                <qco-preview-toolbar></qco-preview-toolbar>

                <!--
                <div class="separator"><div class="hover"></div></div>
                -->

                <div class="preview">
                    <qco-preview></qco-preview>
                </div>

            </div>
            `

        const $drawers = this.querySelectorAll("qcp-app > .drawer")
        const $routers = this.querySelectorAll("qcp-app > .drawer > qca-router")
        const $tabsContainers = this.querySelectorAll("qca-tabs")

        $tabsContainers.forEach(($tabs, groupIndex) =>
        {
            $tabs.addEventListener("qe_selectedIndexChanged", (e) =>
            {
                const selectedIndex = e.detail.selectedIndex
                if (selectedIndex === null)
                {
                    $routers[groupIndex].removeAttribute("selected-route")
                }
                else
                {
                    const route = $tabs.children[selectedIndex].getAttribute("name")
                    $routers[groupIndex].setAttribute("selected-route", route)
                }
            })
        })

        $routers.forEach(($router, groupIndex) =>
        {
            $router.addEventListener("qe_selectedRouteChanged", (e) =>
            {
                // Collapse drawer if no tabs are selected.
                if ($router.getAttribute("selected-route") === null)
                {
                    $drawers[groupIndex].classList.add("hidden")
                }
                else
                {
                    $drawers[groupIndex].classList.remove("hidden")
                }
            })
        })

    }

    async connectedCallback()
    {
        await renderer.init()

        for (const source of sources.sources)
        {
            await renderer.loadSource(source)
        }
    }
})
