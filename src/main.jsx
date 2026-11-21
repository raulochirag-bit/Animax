
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Menu, X, Play, Flame, Compass, Bookmark,
  ChevronRight, Star, Sparkles
} from "lucide-react";
import "./style.css";

const animeList = [
  { id: 1, title: "Solo Leveling", genre: "Action", year: 2024, rating: "8.6", color: "blue", description: "A hunter discovers a mysterious power that changes his destiny." },
  { id: 2, title: "Attack on Titan", genre: "Action", year: 2013, rating: "9.1", color: "red", description: "Humanity fights for survival behind enormous walls." },
  { id: 3, title: "Demon Slayer", genre: "Fantasy", year: 2019, rating: "8.7", color: "green", description: "A young swordsman begins a journey to save his sister." },
  { id: 4, title: "Death Note", genre: "Mystery", year: 2006, rating: "8.6", color: "purple", description: "A mysterious notebook gives its owner extraordinary power." },
  { id: 5, title: "Jujutsu Kaisen", genre: "Action", year: 2020, rating: "8.5", color: "orange", description: "A student enters a dangerous world of curses." },
  { id: 6, title: "One Piece", genre: "Adventure", year: 1999, rating: "9.0", color: "gold", description: "A pirate crew searches for the legendary treasure." },
  { id: 7, title: "Naruto", genre: "Adventure", year: 2002, rating: "8.4", color: "orange", description: "A young ninja dreams of becoming the strongest leader." },
  { id: 8, title: "Blue Lock", genre: "Sports", year: 2022, rating: "8.1", color: "blue", description: "Strikers compete for a place on Japan's football team." },
  { id: 9, title: "Haikyuu!!", genre: "Sports", year: 2014, rating: "8.7", color: "gold", description: "A volleyball player pursues his dream of reaching the top." },
  { id: 10, title: "Spy x Family", genre: "Comedy", year: 2022, rating: "8.3", color: "pink", description: "An unusual family hides secrets from one another." },
  { id: 11, title: "Dr. Stone", genre: "Adventure", year: 2019, rating: "8.1", color: "green", description: "Science becomes humanity's hope in a new stone world." },
  { id: 12, title: "Frieren", genre: "Fantasy", year: 2023, rating: "9.3", color: "purple", description: "An elf mage reflects on time, friendship and adventure." }
];

const genres = ["All", "Action", "Adventure", "Fantasy", "Mystery", "Sports", "Comedy"];

function AnimeCard({ anime }) {
  return (
    <article className="anime-card">
      <div className={`poster poster-${anime.color}`}>
        <span className="poster-tag">{anime.genre}</span>
        <span className="poster-symbol">A</span>
        <div className="poster-title">{anime.title}</div>
        <span className="poster-year">{anime.year}</span>
        <span className="poster-play"><Play size={22} fill="currentColor" /></span>
      </div>
      <div className="card-info">
        <div className="card-title-row">
          <h3>{anime.title}</h3>
          <span className="rating"><Star size={13} fill="currentColor" /> {anime.rating}</span>
        </div>
        <p>{anime.genre} <span>•</span> {anime.year}</p>
      </div>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredAnime = useMemo(() => {
    return animeList.filter((anime) => {
      const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genre === "All" || anime.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [search, genre]);

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#">
          Ani<span>Max</span><i>.</i>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#catalogue" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#trending" onClick={() => setMenuOpen(false)}>Trending</a>
          <a href="#catalogue" onClick={() => setMenuOpen(false)}>Genres</a>
        </nav>

        <div className="nav-actions">
          <a className="login-btn" href="#login">Login</a>
          <a className="signup-btn" href="#login">Get Started</a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow"><Sparkles size={15} /> YOUR ANIME UNIVERSE</div>
            <h1>Discover stories.<br /><span>Experience anime.</span></h1>
            <p>Explore unforgettable worlds, discover your next favourite series and keep your anime journey organised.</p>
            <div className="hero-actions">
              <a href="#catalogue" className="primary-btn"><Compass size={17} /> Explore Anime</a>
              <a href="#trending" className="secondary-btn"><Play size={16} /> Trending Now</a>
            </div>
            <div className="hero-note"><span className="live-dot" /> YOUR NEXT ADVENTURE STARTS HERE</div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="hero-letter">A</div>
            <div className="floating-card card-one"> <Flame size={16} /> Anime discovery</div>
            <div className="floating-card card-two"><Star size={16} /> Find your favourite</div>
          </div>
        </section>

        <section className="stats">
          <div><strong>DISCOVER</strong><span>New worlds</span></div>
          <div><strong>EXPLORE</strong><span>Different genres</span></div>
          <div><strong>BUILD</strong><span>Your watchlist</span></div>
        </section>

        <section className="catalogue section" id="catalogue">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><Compass size={14} /> THE COLLECTION</div>
              <h2>Explore Anime</h2>
              <p>Find a story worth getting lost in.</p>
            </div>
            <span className="collection-count">{filteredAnime.length} titles</span>
          </div>

          <div className="search-filter">
            <div className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anime titles..."
                aria-label="Search anime"
              />
              {search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={16} /></button>}
            </div>
            <div className="genre-list">
              {genres.map((item) => (
                <button
                  key={item}
                  className={genre === item ? "genre-chip selected" : "genre-chip"}
                  onClick={() => setGenre(item)}
                >{item}</button>
              ))}
            </div>
          </div>

          <div className="anime-grid">
            {filteredAnime.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
          </div>

          {filteredAnime.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No anime found</h3>
              <p>Try another title or choose a different genre.</p>
              <button onClick={() => { setSearch(""); setGenre("All"); }}>Clear filters</button>
            </div>
          )}
        </section>

        <section className="discover-banner" id="trending">
          <div>
            <div className="eyebrow"><Flame size={15} /> KEEP EXPLORING</div>
            <h2>Your next favourite anime is waiting.</h2>
            <p>Browse the collection and discover something new.</p>
          </div>
          <a href="#catalogue" className="primary-btn">Explore collection <ChevronRight size={17} /></a>
        </section>
      </main>

      <footer>
        <a className="brand" href="#">Ani<span>Max</span><i>.</i></a>
        <p>Discover your next anime adventure.</p>
        <span>© 2026 AniMax. Anime discovery platform.</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
