/*
    Generates JSON metadata.
    - Library: all quizzes information
    - Themes
    Call from root folder.

    Usage: deno run --allow-read --allow-write .\ops\gen-metadata.mjs
*/

import * as toml from "jsr:@std/toml"

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
    const paths = [];

    for await (const file of Deno.readDir(dir))
    {
        const filePath = `${dir}/${file.name}`;

        // File.
        if (!file.isDirectory && file.name.endsWith(extension))
        {
            paths.push(filePath);
        }

        // Folder.
        else if (file.isDirectory)
        {
            for (const childPath of await listPaths(filePath, extension))
            {
                paths.push(childPath);
            }
        }
    }

    return paths;
};


const readMetadata = async (path) =>
{
    const content = await Deno.readTextFile(path)
    const metadata = toml.parse(content)
    //console.log(content)
    return metadata
}


const themePaths = await listPaths(themesDir, ".toml")
console.log("themePaths", themePaths)
const themes = await themePaths.mapAsync(path => readMetadata(path))

const exercisePaths = await listPaths(exercisesDir, ".toml")
const exercises = await exercisePaths.mapAsync(path => readMetadata(path))

const metadata = { themes, exercises }
//console.log(metdata)
const json = JSON.stringify(metadata, null, "  ")
//fs.writeFile(outputPath, json)
Deno.writeTextFileSync(outputPath, json);
