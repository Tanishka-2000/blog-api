const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

exports.getAllPosts = (req, res) => {
  Post.find({}, 'title content img', (err, posts) => {
    res.json({posts})
  });
  // res.json({posts: [
  //   {id: 1, title: "Aliens built pyramid", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
  //   {id: 2, title: "Cats should overthrow government", content:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
  // ]});
};

exports.getSpecifiedPost = (req, res) => {
  res.json({id: req.params.postId, title: "Is your cat plotting to kill you", content:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})
};

exports.getComments = (req, res) => {
  res.json({post_id: req.params.postId, comments: [{ id: 1, content: 'comment1', username: "fluffykit"}, { id: 2, content: 'comment2', username:"fuzzball"}]});

};

exports.createNewComment = (req, res) => {
    const comment = {
      id: 234,
      postId: req.params.postid,
      username: req.body.username,
      comment: req.body.comment
    }
    res.json({message:'New comment created!',
  comment});
};
// Posts.find({}, (err, posts) => {
  //   if(err) return res.status(502).json({error: err});
  //   if(!posts) return res.json({posts: null});
  //   res.josn({posts});
  // });