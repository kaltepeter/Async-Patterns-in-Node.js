async function getData(fetchMethod) {
    let rawData = await fetchMethod();
    return JSON.parse(rawData);
}