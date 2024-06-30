import Store from "./Store.js"


export default class QomComponent extends HTMLElement
{
    constructor(props = {})
    {
        super()

        this.render = this.render || function() {}
  
        const self = this
        if (props.store instanceof Store)
        {
            props.store.events.subscribe("stateChanged", () => self.render())
        }

        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (oldValue === newValue)
            return
    
        //console.log(`ATTRIBUTE changed: ${name} (${oldValue} -> ${newValue})`)
    
        this[name] = newValue
    }
}
