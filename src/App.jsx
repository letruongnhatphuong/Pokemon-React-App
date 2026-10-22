import { Link, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

function App() {

  return (
    <> <header className="header">
      <Link className="brand" to="/">
        <img src="/favicon.svg" alt="" width="32" height="32" />
        My Pokédex
      </Link>
    </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="*" element={<section><h1>Page not found</h1><Link to="/">Back to the Pokédex</Link></section>} />
        </Routes>
      </main>

    </>
  )
}

export default App;
