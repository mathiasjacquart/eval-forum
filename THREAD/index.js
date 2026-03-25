const express = require("express");

const app = express();
const PORT = 80;
const API_URL = process.env.API_URL || "http://api:80";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Impossible de recuperer les posts");
    }

    const posts = await response.json();
    const postsHtml = posts
      .map(
        (post) => `
          <li style="border:1px solid #ddd;padding:10px;margin-bottom:10px;border-radius:6px;">
            <h3 style="margin:0 0 5px;">${post.title}</h3>
            <p style="margin:0 0 5px;">${post.content}</p>
            <small>Par ${post.pseudonym?.name || "Inconnu"}</small>
          </li>
        `,
      )
      .join("");

    res.send(`
      <html>
        <head><title>Thread - Messages</title></head>
        <body style="font-family:Arial,sans-serif;max-width:800px;margin:30px auto;">
          <h1>Messages utilisateurs</h1>
          <ul style="list-style:none;padding:0;">${postsHtml || "<li>Aucun message.</li>"}</ul>
          <a href="http://localhost:8080">Envoyer un message</a>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Erreur Thread: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Thread demarre sur le port ${PORT}`);
});
