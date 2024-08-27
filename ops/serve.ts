/*
    Serves the app for development.
    Call from root folder.

    Usage: deno run --allow-read --allow-net --watch ./ops/serve.ts
*/

import * as dotenv from "jsr:@std/dotenv"
import * as mediaTypes from "jsr:@std/media-types"
import * as path from "jsr:@std/path"
import * as route from "jsr:@std/http/route"


const env = await dotenv.load({ envPath: "ops/.env" })
const port = parseInt(env["PORT"] ?? "0")
if (port == 0)
    throw new Error("Port is not specified")

const redirectResponse = (
    location: string,
): Response =>
{
    const init: ResponseInit =
    {
        status: 302,
        headers:
        {
            "location": location,
        },
    }

    return new Response(null, init)
}

const fileResponse = (
    stream: ReadableStream<Uint8Array>,
    contentType: string,
    contentSize: number,
): Response =>
{
    const init: ResponseInit =
    {
        status: 200,
        headers: {
            "content-length": contentSize.toString(),
            "content-type": contentType,
        }
    }

    return new Response(stream, init)
}

const serveFile = async (
    filePath: string,
): Promise<Response> =>
{
    let fileInfo = undefined
    try
    {
        fileInfo = await Deno.stat(filePath)
    }
    catch (e)
    {
        if (e instanceof Deno.errors.NotFound)
        {
            return new Response(null, { status: 404 })
        }
        return new Response(null, { status: 500 })
    }

    const contentType = mediaTypes.contentType(path.extname(filePath)) || "application/octet-stream"

    const file = await Deno.open(filePath)

    return fileResponse(file.readable, contentType, fileInfo.size)
}

const serveDir = async (
    request: Request,
    baseUrl: string,
    baseDir: string,
): Promise<Response> =>
{
    const requestUrl = new URL(request.url)
    const endpoint = requestUrl.pathname.substring(baseUrl.length)
    const filePath = baseDir + endpoint

    console.log(`Request to '${endpoint}' resolved to '${filePath}'`)

    return await serveFile(filePath)
}


const baseUrl = "/Quiz-O-Matic/"

const routes: route.Route[] =
[
    {
        pattern: new URLPattern({ pathname: "/" }),
        handler: () => redirectResponse(`${baseUrl}`),
    },
    {
        pattern: new URLPattern({ pathname: `${baseUrl}` }),
        handler: () => serveFile("./app/src/index.html"),
    },
    {
        pattern: new URLPattern({ pathname: `${baseUrl}template/*` }),
        handler: (request) => serveDir(request, baseUrl, "./"),
    },
    {
        pattern: new URLPattern({ pathname: `${baseUrl}*` }),
        handler: (request) => serveDir(request, baseUrl, "./app/src/"),
    },
]

function defaultHandler(_req: Request)
{
    return new Response(null, { status: 404 })
}

Deno.serve({ port: port }, route.route(routes, defaultHandler))
