/*
    Generates JSON :
    - Library JSON, which contains all quizzes information.
    Call from root folder.

    Usage: node ops/gen-metadata.mjs
*/

import fs from "node:fs/promises"
import path from "node:path"


const exercisesDir = "template/quizzes"
const themesDir = "template/themes"
const outputPath = "./out/www/metadata.json"


Array.prototype.takeUntil = function (predicate)
{
    return this.slice(0, this.findIndex(predicate))
}

Array.prototype.mapAsync = async function (selector)
{
    const items = []
    for (const item of this)
        items.push(await selector(item))
    return items
}


const listPaths = async (dir, extension) =>
{
    var paths = []

    for (const file of await fs.readdir(dir, { withFileTypes: true }))
    {
        const fileType = file[Object.getOwnPropertySymbols(file)[0]]
        const filePath = `${file.path}/${file.name}`

        // File.
        if (fileType === 1 && path.extname(file.name) == extension)
        {
            paths.push(filePath)
        }

        // Folder.
        else if (fileType === 2)
        {
            for (const childPath of await listPaths(filePath, extension))
            {
                paths.push(childPath)
            }
        }
    }

    return paths
}

const readMetadata = async (path) =>
{
    const content = await fs.readFile(path, { encoding: "utf8" })

    const metadataLines = content
        .split("\n")
        .takeUntil(line => !line.startsWith("//"))
        .map(line => line.substring(3).trim())

    metadataLines.push(`path=${path.substring(8)}`)

    const metadata = metadataLines
        .map(line =>
        {
            const index = line.indexOf("=")
            return [line.substring(0, index), line.substring(index + 1)]
        })
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})

    return metadata
}


const themePaths = await listPaths(themesDir, ".typ")
const themes = await themePaths.mapAsync(path => readMetadata(path))

const exercisePaths = await listPaths(exercisesDir, ".typ")
const exercises = await exercisePaths.mapAsync(path => readMetadata(path))

const metadata = { themes, exercises }
const json = JSON.stringify(metadata, null, "  ")
fs.writeFile(outputPath, json)
