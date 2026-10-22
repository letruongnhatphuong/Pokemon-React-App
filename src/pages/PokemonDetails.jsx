import { Link, useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams();

    return (
        <section>
            <h1>{name}</h1>
            <p>Pokémon details are coming next.</p>
            <Link to="/">Back to the Pokédex</Link>
        </section>
    );
}

export default PokemonDetails;
