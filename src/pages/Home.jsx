import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getData } from '../api';

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, parseInt(searchParams.get('page'), 10) || 1);
    const [pokemon, setPokemon] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadPokemon() {
            setLoading(true);
            setError('');

            try {
                const data = await getData(`pokemon?limit=12&offset=${(page - 1) * 12}`);
                if (active) {
                    setPokemon(data.results);
                    setHasNextPage(data.next !== null);
                }
            } catch {
                if (active) {
                    setError('Could not load Pokémon. Please try again later.');
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
    }, [page]);

    function findPokemon(event) {
        event.preventDefault();
        const name = search.trim().toLowerCase().replaceAll(' ', '-');

        if (name) {
            navigate(`/pokemon/${encodeURIComponent(name)}`);
        }
    }

    if (loading) {
        return <p role="status">Loading Pokémon...</p>;
    }

    if (error) {
        return (
            <section>
                <p role="alert">{error}</p>
                <Link to="/">Back to the first page</Link>
            </section>
        );
    }

    return (
        <section>
            <h1>Pokémon List</h1>
            <p>Select a Pokémon to view its details.</p>
            <form className="search" onSubmit={findPokemon}>
                <label htmlFor="pokemon-search">Search by name or number</label>
                <div className="search-controls">
                    <input
                        id="pokemon-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="e.g. pikachu or 25"
                        required
                    />
                    <button type="submit">Search</button>
                </div>
            </form>
            <ul className="pokemon-list">
                {pokemon.map((item) => (
                    <li key={item.name}>
                        <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <nav className="pagination" aria-label="Pokémon pages">
                <button disabled={page === 1} onClick={() => setSearchParams({ page: page - 1 })}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button disabled={!hasNextPage} onClick={() => setSearchParams({ page: page + 1 })}>
                    Next
                </button>
            </nav>
        </section>
    );
}

export default Home;
