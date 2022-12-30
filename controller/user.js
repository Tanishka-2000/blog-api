const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

const bcryptjs = require('bcryptjs');
const User = require('../models/user.js');

exports.getAllPosts = (req, res) => {
  Post.find({published: true}, 'title content img', (error, posts) => {
    if(error) return res.status(502).json({error});
    res.json({posts});
  });

};

exports.getSpecifiedPost = (req, res) => {
  Post.findById(req.params.postId, 'title content img', (error, post) => {
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
    });
};



// exports.signIn = (req, res) => {
//   bcryptjs.hash(req.body.password, 10, function(err, hash){
//     if(err) return res,json(err);
//     const user = new User({
//       username: req.body.username,
//       password: hash
//     });
//     user.save(err => {
//       if(err) return res.json(err);
//       res.json('user saved');
//     });
//   });
// }

exports.logIn = (req, res) => {
  
  User.findOne({username: req.body.username}, function(err, user){
    if(err) return res.json(err)
    if(!user) return res.json({message: "user not found"});
   
    bcryptjs.compare(req.body.password, user.password, function(err, result) {
      if(err) return res.json(err);
      if(!result) return res.json({message:'incorrect password'});
      res.json({message: 'login successfull', user})
    });
  });

};