import QStore from "../lib/QStore.js"


const initialState =
{
    items: [],
}

const actions =
{
    addItem: "addItem",
    clearItem: "clearItem",
    changeSeed: "changeSeed",
}

const reducers =
{
    addItem: (state, payload) =>
    {
        state.items.push(payload.item)
        return state
    },

    clearItem: (state, payload) =>
    {
        state.items.splice(payload.index, 1)
        return state
    },

    changeSeed: (state, payload) =>
    {
        console.log("changeSeed", payload)
        state.items[payload.index].seed = payload.seed
        return state
    },
}

const effects =
[
]


class QsOutline extends QStore
{
    constructor()
    {
        super
        ({
            initialState,
            actions,
            reducers,
            effects,
        })
    }

    load()
    {
        if (this.state.isLoading)
            return

        this.dispatch(actions.load, {})
    }

    addItem(item)
    {
        this.dispatch(actions.addItem, { item })
    }

    clearItem(index)
    {
        this.dispatch(actions.clearItem, { index })
    }

    changeSeed(index, seed)
    {
        this.dispatch(actions.changeSeed, { index, seed })
    }
}


export default new QsOutline()
