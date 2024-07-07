import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"


const routes =
{
    library: "library",
    configuration: "configuration",
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
            <div class="column appBar">

                <qca-tabs
                    orientation="vertical"
                    selected-index="0"
                    can-unselect="true"
                >
                    <qca-tabs.tab
                        name="${routes.library}"
                        title="Library"
                    >
                        <span class="iconoir-book-stack"></span>
                    </qca-tabs.tab>
                </qca-tabs>

                <div class="separator"></div>

                <qca-tabs
                    orientation="vertical"
                    selected-index="0"
                    can-unselect="true"
                >
                    <qca-tabs.tab
                        name="${routes.outline}"
                        title="Outline"
                    >
                        <span class="iconoir-numbered-list-left"></span>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.configuration}"
                        title="Configuration"
                    >
                        <span class="iconoir-okrs"></span>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.preview}"
                        title="Preview"
                    >
                        <span class="iconoir-page-flip"></span>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.download}"
                        title="Download"
                    >
                        <span class="iconoir-download"></span>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.settings}"
                        title="Settings"
                    >
                        <span class="iconoir-settings"></span>
                    </qca-tabs.tab>
                </qca-tabs>

            </div>

            <div class="column drawer">

                <qca-router
                    selected-route="${routes.library}"
                >
                    <qca-router.page match-route="${routes.library}">
                        <h1>Library</h1>
                        <qco-library-filters></qco-library-filters>
                        <qco-library></qco-library>
                    </qca-router.page>
                </qca-router>

                <div class="separator"><div class="hover"></div></div>

                <qca-router
                    selected-route="${routes.outline}"
                >
                    <qca-router.page match-route="${routes.outline}">
                        <h1>Outline</h1>
                        <qco-outline></qco-outline>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.configuration}">
                        <h1>Configuration</h1>
                        <qco-configuration></qco-configuration>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.preview}">
                        <h1>Preview (TODO: mobile only)</h1>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.download}">
                        <h1>Download</h1>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.settings}">
                        <h1>Settings</h1>
                        <qco-settings></qco-settings>
                    </qca-router.page>
                </qca-router>

            </div>

            <div class="separator"><div class="hover"></div></div>

            <div
                style="flex-grow: 1"
            >
                <qco-preview></qco-preview>
            </div>
            `

        const $drawer = this.querySelector("qcp-app > .drawer")
        const $tabsContainers = this.querySelectorAll("qca-tabs")
        const $topTabs = $tabsContainers[0]
        const $bottomTabs = $tabsContainers[1]
        const $routers = this.querySelectorAll("qca-router")
        const $topRouter = $routers[0]
        const $bottomRouter = $routers[1]

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

        $routers.forEach(($router) =>
        {
            $router.addEventListener("qe_selectedRouteChanged", (e) =>
            {
                // Collapse drawer if all tabs are unselected.
                const routeIsNull = ($router) => $router.getAttribute("selected-route") === null
                if ([...$routers].every(routeIsNull))
                {
                    $drawer.classList.add("hidden")
                }
                else
                {
                    $drawer.classList.remove("hidden")
                }
            })
        })
    }
})
