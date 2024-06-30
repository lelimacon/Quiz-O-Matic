import QStore from "./QStore.js"


export default class QComponent extends HTMLElement
{
    constructor(props = {})
    {
        super()

        this.render = this.render || function() {}
  
        const self = this
        if (props.store instanceof QStore)
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
