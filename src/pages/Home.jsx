import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../api';

function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadPokemon() {
            try {
                const data = await getData('pokemon?limit=12');
                setPokemon(data.results);
            } catch {
                setError('Could not load Pokémon. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        loadPokemon();
    }, []);

    if (loading) {
        return <p>Loading Pokémon...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <section>
            <h1>Pokémon List</h1>
            <p>Select a Pokémon to view its details.</p>
            <ul>
                {pokemon.map((item) => (
                    <li key={item.name}>
                        <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Home;
