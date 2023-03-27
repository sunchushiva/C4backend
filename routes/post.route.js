const express = require("express");
const authMiddleware = require("../middlewares/authmiddleware");
const PostModel = require("../modules/post.module");

const postRoute = express.Router();

postRoute.post("/add", authMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new PostModel(payload);
    await newPost.save();
    res.send({ message: "New note added" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

postRoute.patch("/update/:_id", authMiddleware, async (req, res) => {
  const _id = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id });
    res.status(200).send({ message: "Note updated" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

postRoute.delete("/delete/:_id", authMiddleware, async (req, res) => {
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Note deleted" });
  } catch (err) {
    res.send({ message: err.message });
  }
});

postRoute.get("/", authMiddleware, async (req, res) => {
  const user = req.body.user;
  try {
    const Data = await PostModel.find({ user });
    res.status(200).send(Data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

postRoute.get("/top", authMiddleware, async (req, res) => {
  const user = req.body.user;
  try {
    const Data = await PostModel.find({ user });
    let Max = { no_of_comments: -Infinity };
    Data.map((el) => {
      if (Max.no_of_comments < el.no_of_comments) {
        Max = el;
      }
    });

    res.status(200).send(Max);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = postRoute;

// {
//   "title": "Post one",
//   "body": "Facebook",
//   "device": "Mobile",
//   "no_of_comments": 4
// }
