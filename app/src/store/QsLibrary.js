import QStore from "../lib/QStore.js"


const initialState =
{
    isLoading: false,
    items: [],
}

const actions =
{
    load: "load",
    loaded: "loaded",
    addItem: "addItem",
    clearItem: "clearItem",
}

const reducers =
{
    load: (state, _) =>
    {
        state.isLoading = true
        return state
    },

    loaded: (state, payload) =>
    {
        state.isLoading = false
        state.items = payload.items
        return state
    },

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
    {
        action: actions.load,
        effect: async (store, payload) =>
        {
            // Demo sleep.
            await new Promise(r => setTimeout(r, 2000))

            const libraryJson = await fetch("library.json").then(r => r.text())
            const items = JSON.parse(libraryJson)

            store.dispatch(actions.loaded, { items })
        },
    },
]


class QsLibrary extends QStore
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


export default new QsLibrary()
