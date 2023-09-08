const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/BlogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

//middleware
app.use(express.json());

app.use(cors());

app.use("/api/Blog", blogRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

//configure mongoose

module.exports = app;
