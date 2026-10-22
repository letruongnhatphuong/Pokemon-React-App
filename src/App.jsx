import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
      <footer>My Pokémon midterm project <span>Data & artwork from <a href="https://pokeapi.co/">PokéAPI</a></span></footer>

    </>
  )
}

export default App;
