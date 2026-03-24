const express = require("express");
const cors = require("cors");

const postsRoutes = require("./routes/posts");
const pseudonymsRoutes = require("./routes/pseudonyms");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API forum en ligne" });
});

app.use("/posts", postsRoutes);
app.use("/pseudonyms", pseudonymsRoutes);

module.exports = app;
