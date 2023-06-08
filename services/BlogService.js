const BlogModel = require("../models/blog");

exports.getAllBlogs = async () => {
  //return await BlogModel.find();

  app.get("/Blog", async (req, res) => {
    const collection = db.collection("Blog");

    try {
      const posts = await collection.find().toArray();
      return res.json(posts);
    } catch (err) {
      console.error("Error retrieving blog posts:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

exports.createBlog = async (blog) => {
  return await BlogModel.create(blog);
};
exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
};

exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};
