import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    return (
        <article className="pokemon-card">
            <h3>{pokemon.name}</h3>
            {pokemon.sprites.front_default && (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}
            <Link to={`/pokemon/${pokemon.name}`}>View details</Link>
        </article>
    );
}

export default PokemonCard;
