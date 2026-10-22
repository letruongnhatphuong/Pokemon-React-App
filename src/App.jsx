import { Link, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

function App() {

  return (
    <> <header className="header">
      <Link className="brand" to="/"><span className="pokeball" aria-hidden="true" /> My Pokédex</Link>
      <Link className="browse-link" to="/">Browse Pokémon</Link>
    </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="*" element={<section className="message"><h1>Page not found</h1><Link to="/">Back to the Pokédex</Link></section>} />
        </Routes>
      </main>

    </>
  )
}

export default App;
