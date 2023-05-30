// const Post = require("../models/models")





// exports.Poster = async (req,res) => {
// try {
//     const { title , desc} = req.body
// if (!title) {
//     return res.json ({error : "Title Required"})
// }

// if (!desc) {
//     return res.json ({error : "Required"})
// }

// const Post = await new Post ({
//     title,
//     desc,
// }) .save();



// res.json ({
//     Post: {
//         title : Post.title,
//         desc : Post.desc,
//     }
// })



// } catch (error) {
//     console.log (err)
// }
// };











const PostModel = require("../models/models");
const mongoose = require("mongoose");


exports.Poster = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || title.length < 6) {
      return res.json({ error: "Title Required" });
    }

    if (!desc) {
      return res.json({ error: "Description Required" });
    }

    const newPost = await new PostModel({
    _id: new mongoose.Types.ObjectId(),
      title,
      desc,
    }).save();


    res.json({
      Post: {
        id: newPost._id,
        title: newPost.title,
        desc: newPost.desc,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({}); // Find all posts in the database

    res.json({
      posts: posts.map((post) => ({
        id: post._id,
        title: post.title,
        desc: post.desc,
      })),
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.findPostById = async (req, res) => {
    try {
      const postId = req.params.id; // Assuming you pass the book ID as a URL parameter
  
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.json({ error: "Post not found" });
      }
  
      res.json({
        post: {
          id: post._id,
          title: post.title,
          desc: post.desc,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  






  exports.updatePostById = async (req, res) => {
    try {
      const postId = req.params.id; // Assuming you pass the post ID as a URL parameter
      const { title, desc } = req.body;
  
      // Validate input data
      if (!title || title.length < 6) {
        return res.json({ error: "Title Required" });
      }
  
      if (!desc) {
        return res.json({ error: "Description Required" });
      }
  
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { title, desc },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.json({ error: "Post not found" });
      }
  
      res.json({
        post: {
          id: updatedPost._id,
          title: updatedPost.title,
          desc: updatedPost.desc,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  


  exports.deletePostById = async (req, res) => {
    try {
      const postId = req.params.id; // Assuming you pass the post ID as a URL parameter
  
      const deletedPost = await PostModel.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.json({ error: "Post not found" });
      }
  
      res.json({
        message: "Post deleted successfully",
        post: {
          id: deletedPost._id,
          title: deletedPost.title,
          desc: deletedPost.desc,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


