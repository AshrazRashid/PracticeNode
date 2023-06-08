const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const { MongoClient, ObjectId } = require("mongodb");

// const db = mongoose
//   .connect("mongodb://localhost:27017/BlogDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// Connection URL and database name
const url = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const dbName = "BlogDB"; // Replace with your database name

let db;

// Connect to MongoDB
async function connectToDatabase() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
  console.log("Connected to MongoDB");
}

connectToDatabase().catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});

const app = express();

//middleware
app.use(express.json());

app.use("/api/blogs", blogRouter);

// Create a new blog post
app.post("/Blog", async (req, res) => {
  const collection = db.collection("Blog");
  const newPost = req.body;

  try {
    const result = await collection.insertOne(newPost);
    res.json(result);
  } catch (err) {
    console.error("Error creating a blog post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all blog posts
app.get("/Blog", async (req, res) => {
  const collection = db.collection("Blog");

  try {
    const posts = await collection.find().toArray();
    res.json(posts);
  } catch (err) {
    console.error("Error retrieving blog posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific blog post by ID
app.get("/Blog/:id", async (req, res) => {
  const collection = db.collection("Blog");
  const postId = req.params.id;

  const convertedId = new ObjectId(postId);

  try {
    const post = await collection.findOne({ _id: convertedId });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (err) {
    console.error("Error retrieving a blog post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a blog post
app.put("/Blog/:id", async (req, res) => {
  const collection = db.collection("Blog");
  const postId = req.params.id;
  const updatedPost = req.body;

  const convertedId = new ObjectId(postId);

  try {
    const result = await collection.replaceOne(
      { _id: convertedId },
      updatedPost
    );
    if (result.modifiedCount === 1) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (err) {
    console.error("Error updating a blog post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a blog post
app.delete("/Blog/:id", async (req, res) => {
  const collection = db.collection("Blog");
  const postId = req.params.id;

  const convertedId = new ObjectId(postId);

  try {
    const result = await collection.deleteOne({
      _id: convertedId,
    });

    if (result.deletedCount === 1) {
      res.json({ message: "Blog post deleted" });
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (err) {
    console.error("Error deleting a blog post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

//configure mongoose

module.exports = app;
