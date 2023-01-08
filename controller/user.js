const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

const bcryptjs = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

exports.getAllPosts = (req, res) => {
  Post.find({published: true}, 'title about img date category', (error, posts) => {
    if(error) return res.status(500).json(error);
    res.json({posts});
  });

};

exports.getSpecifiedPost = (req, res) => {
  Post.findById(req.params.postId, 'title about img date category content', (error, post) => {
    if(error) return res.status(500).json(error);
    res.json({post});
  });
};

exports.getComments = (req, res) => {
  Comment.find({postId: req.params.postId}, (error, comments) => {
    if(error) return res.status(500).json(error);
    res.json({comments});
  });
};

exports.createNewComment = (req, res) => {

    if(!req.body.username.trim() || !req.body.comment.trim()) {
      return res.json({error: {
          username: req.body.username.trim() ? null : 'Username must be provided',
          comment: req.body.comment.trim() ? null : 'Comment must be provided',
        },
        code: 400
      });
    }

    Post.findById(req.params.postId, (err, post) => {
      if(err) return res.status(500).json(err);
      if(!post) return res.json({erorr: `No post exist with id ${req.params.postId}`, code:400});

      const comment = new Comment({
        postId: req.params.postId,
        username: req.body.username,
        comment: req.body.comment,
        timeStamp: new Date()
      });
   
      comment.save(error => {
        if(error) return res.status(500).json(error);
        res.status(201).json({error:null});
      });
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
  
  if(!req.body.username.trim() || !req.body.password.trim()) {
    return res.json({error: {
        username: req.body.username.trim() ? null : 'Username must be provided',
        password: req.body.password.trim() ? null : 'Password must be provided',
      },
      code: 400
    });
  }

  User.findOne({username: req.body.username}, function(err, user){
    if(err) return res.status(500).json(err);
    if(!user) return res.json({error: {
        username: 'Incorrect username',
        password: null
      },
      code:400,
      token: null});
   
    bcryptjs.compare(req.body.password, user.password, function(err, result) {
      if(err) return res.status(500).json(err);
      if(!result) return res.json({error:{
          username: null,
          password: 'Incorrect Password'
        },
        code: 400,
        token: null});

      // res.json({message: 'login successfull', user})
      let token = jwt.sign({ id: user.id}, process.env.SECRETKEY, {expiresIn: '1d'});
      res.status(200).json({token});
    });
  });
};