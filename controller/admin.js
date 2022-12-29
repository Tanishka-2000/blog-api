const Posts = require('../models/posts.js');
const Comments = require('../models/comments.js');

exports.logUser = (req, res) => {
  res.json({"token": "4567bnvmnfg8989"});
};

exports.getAllPosts = (req, res) => {
  res.json({posts: [
    {id: 1, published: "true", title: "Aliens built pyramid", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {id: 2, published: "true", title: "Cats should overthrow government", content:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
  ]});
};

exports.getSpecifiedPost = (req, res) => {
  res.json({id: req.params.postId, published: "true", title: "Is your cat plotting to kill you", content:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})

};

exports.getComments = (req, res) => {
  res.json({post_id: req.params.postId, comments: [{ id: 1, content: 'comment1', username: "fluffykit"}, { id: 2, content: 'comment2', username:"fuzzball"}]});

};

exports.updatePost = (req, res) => {
  const newPost = {
    id: req.params.postId,
    title: req.body.title,
    content: req.body.content,
    published: req.body.publish
  }
  res.json({message: "Post updated", newPost})
};

exports.deleteComment = (req, res) => {
  res.json({message: `Comment with id ${req.params.commentId} deleted!`})
};
  // Posts.find({}, (err, posts) => {
  //   if(err) return res.status(502).json({error: err});
  //   if(!posts) return res.json({posts: null});
  //   res.josn({posts});
  // });