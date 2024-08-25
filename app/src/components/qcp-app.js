import { html } from "../lib/utils.js"
import QComponent from "../lib/QComponent.js"
import sources from "../sources.js"
import renderer from "../lib/renderer.js"


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
            <div class="header">

                <qca-tabs
                    orientation="horizontal"
                    selected-index="0"
                    can-unselect="true"
                >
                    <qca-tabs.tab
                        name="${routes.library}"
                        title="Library"
                    >
                        <span class="iconoir-book-stack"></span>
                    </qca-tabs.tab>
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
                        <span class="iconoir-download"></span>
                    </qca-tabs.tab>
                    <qca-tabs.tab
                        name="${routes.settings}"
                        title="Settings"
                    >
                        <span class="iconoir-settings"></span>
                    </qca-tabs.tab>
                </qca-tabs>

                <div class="space"></div>

                <qco-preview-toolbar></qco-preview-toolbar>

                <div class="space"></div>

                <qca-tabs
                    orientation="horizontal"
                    selected-index="1"
                    can-unselect="true"
                >
                    <qca-tabs.tab
                        name="${routes.library}"
                        title="Library"
                    >
                        <span class="iconoir-book-stack"></span>
                    </qca-tabs.tab>
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

            <div class="content">

                <qca-router
                    class="drawer column"
                    selected-route="${routes.library}"
                >
                    <qca-router.page match-route="${routes.library}">
                        <div class="panelHeader">
                            <h1>Library</h1>
                        </div>
                        <div class="panelBody">
                            <!--
                            <qco-library-filters></qco-library-filters>
                            -->
                            <qco-library></qco-library>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.outline}">
                        <div class="panelHeader">
                            <h1>Outline</h1>
                        </div>
                        <div class="panelBody">
                            <qco-outline></qco-outline>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.configuration}">
                        <div class="panelHeader">
                            <h1>Configuration</h1>
                        </div>
                        <div class="panelBody">
                            <qco-configuration></qco-configuration>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.preview}">
                        <div class="panelHeader">
                            <h1>Preview (TODO: mobile only)</h1>
                        </div>
                        <div class="panelBody">
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.download}">
                        <div class="panelHeader">
                            <h1>Download</h1>
                        </div>
                        <div class="panelBody">
                            </qca-router.page>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.settings}">
                        <div class="panelHeader">
                            <h1>Settings</h1>
                        </div>
                        <div class="panelBody">
                            <qco-settings></qco-settings>
                        </div>
                    </qca-router.page>
                </qca-router>

                <!--
                <div class="separator"><div class="hover"></div></div>
                -->

                <div class="preview column">
                    <qco-preview></qco-preview>
                </div>

                <!--
                <div class="separator"><div class="hover"></div></div>
                -->

                <qca-router
                    class="drawer column"
                    selected-route="${routes.outline}"
                >
                    <qca-router.page match-route="${routes.library}">
                        <div class="panelHeader">
                            <h1>Library</h1>
                        </div>
                        <div class="panelBody">
                            <!--
                            <qco-library-filters></qco-library-filters>
                            -->
                            <qco-library></qco-library>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.outline}">
                        <div class="panelHeader">
                            <h1>Outline</h1>
                        </div>
                        <div class="panelBody">
                            <qco-outline></qco-outline>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.configuration}">
                        <div class="panelHeader">
                            <h1>Configuration</h1>
                        </div>
                        <div class="panelBody">
                            <qco-configuration></qco-configuration>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.preview}">
                        <div class="panelHeader">
                            <h1>Preview (TODO: mobile only)</h1>
                        </div>
                        <div class="panelBody">
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.download}">
                        <div class="panelHeader">
                            <h1>Download</h1>
                        </div>
                        <div class="panelBody">
                            <qco-downloads></qco-downloads>
                        </div>
                    </qca-router.page>
                    <qca-router.page match-route="${routes.settings}">
                        <div class="panelHeader">
                            <h1>Settings</h1>
                        </div>
                        <div class="panelBody">
                            <qco-settings></qco-settings>
                        </div>
                    </qca-router.page>
                </qca-router>

            </div>

            `

        const $drawers = this.querySelectorAll("qcp-app > .content > .drawer")
        const $tabsContainers = this.querySelectorAll("qca-tabs")
        //const $leftTabs = $tabsContainers[0]
        //const $rightTabs = $tabsContainers[1]
        const $routers = this.querySelectorAll("qca-router")
        //const $leftRouter = $routers[0]
        //const $rightRouter = $routers[1]

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
