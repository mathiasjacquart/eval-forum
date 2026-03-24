const Post = require("../models/Post");

async function getPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

async function createPost(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Les champs title et content sont obligatoires." });
  }

  try {
    const newPost = await Post.create({ title, content });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

module.exports = {
  getPosts,
  createPost,
};
