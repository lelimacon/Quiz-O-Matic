import sources from "../sources.js"
import QStore from "../lib/QStore.js"


const themeStateFromThemeCode = (themeCode) =>
    sources.themes
        .filter(theme => theme.code === themeCode)
        .map(theme =>
        { return {
            code: theme.code,
            path: theme.path,
            options: {
                primaryColor: theme.defaults.primaryColor,
                secondaryColor: theme.defaults.secondaryColor,
            },
        }})[0]

const initialState =
{
    mode: 0,
    title: "Your Final Test",
    subtitle: "Until next one!",
    date: new Date().toISOString().split("T")[0], // "2049-01-01"
    theme: themeStateFromThemeCode("T_PLN"),
    exercises: [],
}

const actions =
{
    setMode: "setMode",
    setTheme: "setTheme",
    setTitle: "setTitle",
    setSubtitle: "setSubtitle",
    setDate: "setDate",
    addItem: "addItem",
    clearItem: "clearItem",
    changeSeed: "changeSeed",
    changeLength: "changeLength",
    changeLevel: "changeLevel",
}

const reducers =
{
    setMode: (state, payload) =>
    {
        state.mode = payload.mode
        return state
    },

    setTheme: (state, payload) =>
    {
        state.theme = themeStateFromThemeCode(payload.themeCode)
        return state
    },

    addItem: (state, payload) =>
    {
        state.exercises.push(payload.item)
        return state
    },

    clearItem: (state, payload) =>
    {
        state.exercises.splice(payload.index, 1)
        return state
    },

    changeSeed: (state, payload) =>
    {
        state.exercises[payload.index].seed = payload.seed
        return state
    },

    changeLength: (state, payload) =>
    {
        state.exercises[payload.index].selectedLength = payload.length
        return state
    },

    changeLevel: (state, payload) =>
    {
        state.exercises[payload.index].selectedLevel = payload.level
        return state
    },
}

const effects =
[
]


class QsQuiz extends QStore
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

    setMode(mode)
    {
        this.dispatch(actions.setMode, { mode })
    }

    setTheme(themeCode)
    {
        this.dispatch(actions.setTheme, { themeCode })
    }

    setTitle(title)
    {
        this.dispatch(actions.setTheme, { title })
    }

    setSubtitle(subtitle)
    {
        this.dispatch(actions.setTheme, { subtitle })
    }

    setDate(date)
    {
        this.dispatch(actions.setTheme, { date })
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


export default new QsQuiz()
