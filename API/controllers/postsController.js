const posts = [];

function getPosts(req, res) {
  res.json(posts);
}

function createPost(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Les champs title et content sont obligatoires." });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);
  return res.status(201).json(newPost);
}

module.exports = {
  getPosts,
  createPost,
};
