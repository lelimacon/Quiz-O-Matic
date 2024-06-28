/*
    Generate the library JSON, which contains all quizzes information.
    Call from root folder.

    Usage: node ops/gen-library.mjs
*/

import fs from "node:fs/promises"
import path from "node:path"


const inputPath = "template/quizzes"
const outputPath = "./out/www/library.json"


Array.prototype.takeUntil = function (predicate)
{
    return this.slice(0, this.findIndex(predicate));
}

const listQuizPaths = async (dir) =>
{
    var quizzes = []

    for (const file of await fs.readdir(dir, { withFileTypes: true }))
    {
        const fileType = file[Object.getOwnPropertySymbols(file)[0]]
        const filePath = `${file.path}/${file.name}`

        // File.
        if (fileType === 1 && path.extname(file.name) == ".typ")
        {
            quizzes.push(filePath)
        }

        // Folder.
        else if (fileType === 2)
        {
            for (const childPath of await listQuizPaths(filePath))
            {
                quizzes.push(childPath)
            }
        }
    }

    return quizzes
}

const readQuizMetadata = async (path) =>
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

const quizPaths = await listQuizPaths(inputPath)
const quizMetadata = []
for (const quizPath of quizPaths)
{
    const metadata = await readQuizMetadata(quizPath)
    quizMetadata.push(metadata)
}

const json = JSON.stringify(quizMetadata, null, "  ")
fs.writeFile(outputPath, json)
