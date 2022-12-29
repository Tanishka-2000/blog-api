const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

exports.getAllPosts = (req, res) => {
  Post.find({published: true}, 'title content img', (error, posts) => {
    if(error) return res.status(502).json({error});
    res.json({posts});
  });
  // res.json({posts: [
  //   {id: 1, title: "Aliens built pyramid", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
  //   {id: 2, title: "Cats should overthrow government", content:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
  // ]});
};

exports.getSpecifiedPost = (req, res) => {
  Post.findById(req.params.postId, 'title content img', (error, post) => {
    if(error) return res.status(502).json({error});
    if(!post) return res.status(400).json({message: `No post exists with id ${req.params.postId}`});
    res.json({post});
  })
  // res.json({id: req.params.postId, title: "Is your cat plotting to kill you", content:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})
};

exports.getComments = (req, res) => {
  Comment.find({postId: req.params.postId}, (error, comments) => {
    if(error) return res.status(502).json({error});
    res.json({comments});
  })
  // res.json({post_id: req.params.postId, comments: [{ id: 1, content: 'comment1', username: "fluffykit"}, { id: 2, content: 'comment2', username:"fuzzball"}]});
};

exports.createNewComment = (req, res) => {
 
    const comment = new Comment({
      postId: req.params.postId,
      username: req.body.username,
      comment: req.body.comment,
      timeStamp: new Date()
    });
 
    comment.save(error => {
      if(error) return res.status(502).json({error});
      res.json({message:'comment posted'});
    })
  //   res.json({message:'New comment created!',
  // comment});
};
// Posts.find({}, (err, posts) => {
  //   if(err) return res.status(502).json({error: err});
  //   if(!posts) return res.json({posts: null});
  //   res.josn({posts});
  // });