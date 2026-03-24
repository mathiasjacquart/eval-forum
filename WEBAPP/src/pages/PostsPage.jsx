import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <section className="card">
      <h2>Liste des posts</h2>

      {loading ? <p>Chargement...</p> : null}
      {error ? <p className="feedback error">{error}</p> : null}

      {!loading && !error && posts.length === 0 ? (
        <p>Aucun post pour le moment.</p>
      ) : null}

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              Par {post.pseudonym?.name || "Inconnu"} -{" "}
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PostsPage;
