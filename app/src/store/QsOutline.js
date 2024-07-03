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
    changeLength: "changeLength",
    changeLevel: "changeLevel",
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
        state.items[payload.index].seed = payload.seed
        return state
    },

    changeLength: (state, payload) =>
    {
        state.items[payload.index].selectedLength = payload.length
        return state
    },

    changeLevel: (state, payload) =>
    {
        state.items[payload.index].selectedLevel = payload.level
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

    changeLength(index, length)
    {
        this.dispatch(actions.changeLength, { index, length })
    }

    changeLevel(index, level)
    {
        this.dispatch(actions.changeLevel, { index, level })
    }
}


export default new QsOutline()
