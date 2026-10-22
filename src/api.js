async function getData(path) {
    const url = path.startsWith('https://') ? path : `https://pokeapi.co/api/v2/${path}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Could not load Pokémon. Please try again.');
    }

    return response.json();
}

export { getData };
