const express = require("express");

const postsRoutes = require("./routes/posts");
const pseudonymsRoutes = require("./routes/pseudonyms");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API forum en ligne" });
});

app.use("/posts", postsRoutes);
app.use("/pseudonyms", pseudonymsRoutes);

module.exports = app;
