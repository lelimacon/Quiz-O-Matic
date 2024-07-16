import QStore from "../lib/QStore.js"


const initialState =
{
    zoom: 100,
}

const actions =
{
    /**
     * Preview zoom level.
     * -1 for stretch.
     *
     * @type {int}
     */
    setZoom: "setZoom",
}

const reducers =
{
    setZoom: (state, payload) =>
    {
        state.zoom = payload.zoom
        return state
    },
}

const effects =
[
]


class QsPreview extends QStore
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

    setZoom(zoom)
    {
        this.dispatch(actions.setZoom, { zoom })
    }
}


export default new QsPreview()
