import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../api';

function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let active = true;

        async function loadPokemon() {
            setLoading(true);
            setError('');

            try {
                const data = await getData(`pokemon/${encodeURIComponent(name)}`);
                if (active) {
                    setPokemon(data);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPokemon();

        return () => {
            active = false;
        };
    }, [name, retry]);

    if (loading) {
        return <p role="status">Loading Pokémon details...</p>;
    }

    if (error) {
        return (
            <section>
                <p role="alert">{error}</p>
                <div className="error-actions">
                    <button onClick={() => setRetry(retry + 1)}>Try again</button>
                    <Link to="/">Back to the Pokédex</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="pokemon-details">
            <h1>{pokemon.name}</h1>
            {pokemon.sprites.front_default && (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}
            <h2>Types</h2>
            <ul>
                {pokemon.types.map((item) => (
                    <li key={item.type.name}>{item.type.name}</li>
                ))}
            </ul>
            <h2>Abilities</h2>
            <ul>
                {pokemon.abilities.map((item) => (
                    <li key={item.ability.name}>
                        {item.ability.name.replaceAll('-', ' ')}
                        {item.is_hidden && ' (hidden ability)'}
                    </li>
                ))}
            </ul>
            <Link to="/">Back to the Pokédex</Link>
        </section>
    );
}

export default PokemonDetails;
