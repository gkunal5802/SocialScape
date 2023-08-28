import Posts from "../models/postModel.js";
import User from "../models/userModel.js";

// ! CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    console.log(req.body);
    const user = await User.findById(userId);
    const newPost = new Posts({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Posts.find();

    res.status(200).json(post);
  } catch (err) {
    // 409: conflict or request could not be completed or processed due to conflict.
    res.status(409).json({ error: err.message });
  }
};

// !READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Posts.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const post = await Posts.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// !UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Posts.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
