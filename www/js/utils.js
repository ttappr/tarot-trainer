
async function loadText(src) {
    let rsp = await fetch(src);

    if (rsp.status != 200) {
        throw new Error(`loadText() failed to fetch text content ` +
                        `from "${src}"; response status ${rsp.status}.`);
    }
    return await rsp.text();
}
