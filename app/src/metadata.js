
const metadata = JSON.parse(await fetch(`metadata.json`).then(r => r.text()))

export default metadata
