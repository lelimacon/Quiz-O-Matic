//window = self

import renderer from "./lib/renderer.js"


/*
const expectedCaches = ["v2"];

const addResourcesToCache = async (resources) =>
{
    const cache = await caches.open("v1")
    await cache.addAll(resources)
}

const deleteCache = async (key) =>
{
    await caches.delete(key);
};

const deleteOldCaches = async () =>
{
    const cacheKeepList = ["v2"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};
*/


self.addEventListener("install", (event) =>
{
    self.console.log("SERVICE_WORKER: Installing")

    //const resources =
    //[
    //    "/index.html",
    //    "/index.js",
    //]
    //event.waitUntil(addResourcesToCache(resources))
})

self.addEventListener('activate', (event) =>
{
    self.console.log("SERVICE_WORKER: Activating")

    //event.waitUntil(
    //    //deleteOldCaches(),
    //    renderer.init(),
    //);
});

self.addEventListener('fetch', (event) =>
{
    const url = new URL(event.request.url);
    //self.console.log(`SERVICE_WORKER: new request to '${url}'`)

    if (url.origin == location.origin && url.pathname == '/hello')
    {
        //event.respondWith(caches.match('/cat.svg'))

        const response = new Response("world",
        {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
        event.respondWith(response)
    }

    else if (url.origin == location.origin && url.pathname == '/hi')
    {
        event.respondWith(fetch("/logo.svg"))
    }
})
