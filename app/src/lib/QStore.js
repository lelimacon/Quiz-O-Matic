import QPubSub from "./QPubSub.js"


export default class QStore
{
    constructor(params)
    {
        this.actions = params.actions || {}
        this.reducers = params.reducers || {}
        this.effects = params.effects || {}
        this.events = new QPubSub()

        const self = this
        this.state = {}
        this.state = new Proxy(params.initialState || {},
        {
            set: function(state, key, value)
            {
                state[key] = value

                //console.log(`stateChanged: ${key} = ${value}`)
                self.events.publish("qe_stateChanged", self.state)

                return true
            }
        })
    }

    dispatch(action, payload)
    {
        if (!this.actions[action])
        {
            console.error(`Action "${action}" doesn't exist`)
            return false
        }

        // Apply reducer.
        const reducer = this.reducers[action]
        if (reducer)
        {
            const newState = reducer(this.state, payload)
            this.state = Object.assign(this.state, newState)
        }

        // Apply effects.
        for (const effect of this.effects.filter(f => f.action == action))
        {
            effect.effect(this, payload)
        }

        // TODO: Apply reducers from other stores.
        // TODO: Apply effects from other stores.

        // Publish action event.
        this.events.publish(`qe_${action}`, payload)

        return true
    }
}
