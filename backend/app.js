const express = require("express");
const Post = require("./models/post");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mean_db:C3E5eGVV8gNLuF3F@cluster0.rm5zx1q.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-with, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, POST, PATCH, OPTIONS");
  next();
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(
    (documents) => {
      res.status(200).json({
        message: "Posts fetched succesfully",
        posts: documents
      });
    }
  );
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(
    (result) => {
      res.status(201).json({
        message: "Post added successfully!",
        postId: result.id
      });
    }
  );
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    (result) => {
      console.log(result);
      res.status(200).json(
        {
          message: 'delete success!'
        }
      );
    }
  );
})

module.exports = app;
