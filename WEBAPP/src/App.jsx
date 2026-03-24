import { NavLink, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PostsPage from "./pages/PostsPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Forum Anonyme</h1>
        <nav className="nav">
          <NavLink to="/" end>
            Formulaire
          </NavLink>
          <NavLink to="/posts">Liste des posts</NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
