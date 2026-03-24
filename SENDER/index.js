const express = require("express");

const app = express();
const PORT = 8080;
const API_URL = process.env.API_URL || "http://api:80";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function resolvePseudonymId(name) {
  const createResp = await fetch(`${API_URL}/pseudonyms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (createResp.ok) {
    const created = await createResp.json();
    return created._id;
  }

  if (createResp.status === 409) {
    const listResp = await fetch(`${API_URL}/pseudonyms`);
    if (!listResp.ok) {
      throw new Error("Impossible de recuperer les pseudonymes existants");
    }
    const pseudonyms = await listResp.json();
    const existing = pseudonyms.find((item) => item.name === name);
    if (!existing) {
      throw new Error("Pseudonyme existant introuvable");
    }
    return existing._id;
  }

  throw new Error("Erreur pendant la creation du pseudonyme");
}

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Sender - Ecrire un message</title></head>
      <body style="font-family:Arial,sans-serif;max-width:600px;margin:30px auto;">
        <h1>Ecrire un message</h1>
        <form method="POST" action="/send" style="display:grid;gap:10px;">
          <input name="pseudonym" placeholder="Pseudonym" required />
          <input name="title" placeholder="Title" required />
          <textarea name="content" placeholder="Content" rows="5" required></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/send", async (req, res) => {
  try {
    const { pseudonym, title, content } = req.body;
    if (!pseudonym || !title || !content) {
      return res.status(400).send("Tous les champs sont obligatoires.");
    }

    const pseudonymId = await resolvePseudonymId(pseudonym.trim());

    const postResp = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, pseudonymId }),
    });

    if (!postResp.ok) {
      const errorData = await postResp.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur creation post");
    }

    res.send("Message envoye avec succes.");
  } catch (error) {
    res.status(500).send(`Erreur Sender: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Sender demarre sur le port ${PORT}`);
});
