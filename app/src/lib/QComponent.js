import { hasSetter } from "./utils.js"


export default class QComponent extends HTMLElement
{
    isConnected = false
    hasEarlyRender = false

    constructor(props = {})
    {
        super()

        this.hasEarlyRender = props.hasEarlyRender

        // TODO: Run under condition.
        //this.render()
    }

    connectedCallback()
    {
        this.isConnected = true

        if (this.render)
            this.render()
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (!this.isConnected && !this.hasEarlyRender)
            return

        if (oldValue === newValue)
            return
    
        if (hasSetter(this, name))
        {
            //console.log(`ATTRIBUTE changed: ${name} (${oldValue} -> ${newValue})`)
            this[name] = newValue
        }

        if (this.render)
            this.render()
    }
}
