const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

exports.getAllPosts = (req, res) => {
  Post.find({}, (error, posts) => {
    if(error) return res.status(502).json({error});
    res.json({posts});
  });
};
exports.createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    published: false
  });

  post.save(error => {
    if(error) return res.status(502).json({error});
    res.json({message: "Post Created", post})
  });
};

exports.getSpecifiedPost = (req, res) => {
  Post.findById(req.params.postId, (error, post) => {
    if(error) return res.status(502).json({error});
    if(!post) return res.status(400).json({message: `No post exists with id ${req.params.postId}`});
    res.json({post});
  });
};

exports.getComments = (req, res) => {
  Comment.find({postId: req.params.postId}, (error, comments) => {
    if(error) return res.status(502).json({error});
    res.json({comments});
  });
};

exports.updatePost = (req, res) => {
  const post = new Post({
    _id: req.params.postId,
    title: req.body.title,
    content: req.body.content,
    published: req.body.publish,
    img: null
  });

  Post.findByIdAndUpdate(req.params.postId, post, {}, (error, updatedPost) => {
    if(error) return res.status(502).json({error});
    res.json({message: "Post updated", updatedPost})
  });
};

exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, err => {
    if(err) return res.status(400).json({message: "couldn't delete comment"});
    res.json({message:"Comment deleted successfully"});
  });
};
