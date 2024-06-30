import QStore from "../lib/QStore.js"


const initialState =
{
    items: [],
}

const actions =
{
    addItem: "addItem",
    clearItem: "clearItem",
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
}


export default new QsOutline()
