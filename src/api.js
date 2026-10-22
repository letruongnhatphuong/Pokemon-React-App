async function getData(path) {
    const url = path.startsWith('https://') ? path : `https://pokeapi.co/api/v2/${path}`;
    let response;

    try {
        response = await fetch(url);
    } catch {
        throw new Error('Could not connect. Check your internet connection and try again.');
    }

    if (response.status === 404) {
        throw new Error('Pokémon not found. Check the name or number and search again.');
    }

    if (!response.ok) {
        throw new Error('Could not load Pokémon. Please try again.');
    }

    return response.json();
}

export { getData };
