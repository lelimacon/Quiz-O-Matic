// TODO: Move to library store.
const sourcePath = "template/source.json"
const mainSource = JSON.parse(await fetch(sourcePath).then(r => r.text()))
mainSource.baseUrl = `${window.location}template/`
//console.log("mainSource.baseUrl", mainSource.baseUrl)

const sources = [mainSource]

export default
{
    sources: sources,
    themes: sources.flatMap(source => source.themes),
    exercises: sources.flatMap(source => source.exercises),
}
