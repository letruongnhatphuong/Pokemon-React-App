import { Link } from 'react-router-dom';

function PokemonCard({ pokemon, backTo }) {
    const image = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

    return (
        <li>
            <Link to={`/pokemon/${pokemon.name}`} state={{ backTo }}>
                {image && <img src={image} alt="" width="56" height="56" />}
                <span>{pokemon.name}</span>
            </Link>
        </li>
    );
}

export default PokemonCard;
