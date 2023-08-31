const { MongoClient } = require("mongodb");

const app = require("express");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  console.log("error connecting", req);

  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  client.close();
});

// // Create a new blog post
// app.post("/user", async (req, res) => {
//   const collection = db.collection("Blog");
//   const newPost = req.body;

//   try {
//     const result = await collection.insertOne(newPost);
//     res.json(result);
//   } catch (err) {
//     console.error("Error creating a blog post:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get all blog posts
// app.get("/Blog", async (req, res) => {
//   const collection = db.collection("Blog");

//   try {
//     const posts = await collection.find().toArray();
//     res.json(posts);
//   } catch (err) {
//     console.error("Error retrieving blog posts:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get a specific blog post by ID
// app.get("/Blog/:id", async (req, res) => {
//   const collection = db.collection("Blog");
//   const postId = req.params.id;

//   const convertedId = new ObjectId(postId);

//   try {
//     const post = await collection.findOne({ _id: convertedId });
//     if (post) {
//       res.json(post);
//     } else {
//       res.status(404).json({ error: "Blog post not found" });
//     }
//   } catch (err) {
//     console.error("Error retrieving a blog post:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Update a blog post
// app.put("/Blog/:id", async (req, res) => {
//   const collection = db.collection("Blog");
//   const postId = req.params.id;
//   const updatedPost = req.body;

//   const convertedId = new ObjectId(postId);

//   try {
//     const result = await collection.replaceOne(
//       { _id: convertedId },
//       updatedPost
//     );
//     if (result.modifiedCount === 1) {
//       res.json(updatedPost);
//     } else {
//       res.status(404).json({ error: "Blog post not found" });
//     }
//   } catch (err) {
//     console.error("Error updating a blog post:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Delete a blog post
// app.delete("/Blog/:id", async (req, res) => {
//   const collection = db.collection("Blog");
//   const postId = req.params.id;

//   const convertedId = new ObjectId(postId);

//   try {
//     const result = await collection.deleteOne({
//       _id: convertedId,
//     });

//     if (result.deletedCount === 1) {
//       res.json({ message: "Blog post deleted" });
//     } else {
//       res.status(404).json({ error: "Blog post not found" });
//     }
//   } catch (err) {
//     console.error("Error deleting a blog post:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
