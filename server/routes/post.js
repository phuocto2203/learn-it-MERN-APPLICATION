const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

//@route GET api/posts
//@desc Get post
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route GET api/posts/:id
//@desc Get post by postId
//@access Private
router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const posts = await Post.findOne({ _id: req.params.id }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/posts
//@desc Create post
//@access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title: title,
      description: description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "GOING TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({
      success: true,
      message: "Created a new post sucessfully!",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route PUT api/posts
//@desc UPDATE post
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "GOING TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    //User not authorized to update post
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized",
      });

    // success to update
    res.json({ success: true, message: "Updated post successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route DELETE api/posts
//@desc DELETE post
//@access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    //User not autorized or post
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "POST not found or user not authorized",
      });

    //success to delete
    res.json({ success: true, message: "Deleted post successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
