import QStore from "./QStore.js"
import { hasSetter } from "./utils.js"


export default class QComponent extends HTMLElement
{
    isConnected = false

    constructor(props = {})
    {
        super()

        this.render = this.render || function() {}
  
        if (props.store instanceof QStore)
        {
            const self = this
            props.store.events.subscribe("stateChanged", () => self.render())
        }

        // TODO: Run under condition.
        //this.render()
    }

    connectedCallback()
    {
        this.isConnected = true
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (!this.isConnected)
            return

        if (oldValue === newValue)
            return
    
        if (hasSetter(this, name))
        {
            console.log(`ATTRIBUTE changed: ${name} (${oldValue} -> ${newValue})`)
            this[name] = newValue
        }

        this.render()
    }
}
