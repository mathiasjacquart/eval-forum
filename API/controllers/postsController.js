const Post = require("../models/Post");
const Pseudonym = require("../models/Pseudonym");

async function getPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate("pseudonym", "name")
      .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

async function createPost(req, res) {
  const { title, content, pseudonymId } = req.body;

  if (!title || !content || !pseudonymId) {
    return res.status(400).json({
      message: "Les champs title, content et pseudonymId sont obligatoires.",
    });
  }

  try {
    const pseudonym = await Pseudonym.findById(pseudonymId);
    if (!pseudonym) {
      return res.status(404).json({ message: "Pseudonyme introuvable." });
    }

    const newPost = await Post.create({
      title,
      content,
      pseudonym: pseudonymId,
    });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

module.exports = {
  getPosts,
  createPost,
};
