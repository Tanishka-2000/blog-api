const Posts = require('../models/posts.js');
const Comments = require('../models/comments.js');

exports.getAllPosts = (req, res) => {
  // Posts.find({}, (err, posts) => {
  //   if(err) return res.status(502).json({error: err});
  //   if(!posts) return res.json({posts: null});
  //   res.josn({posts});
  // });
};

exports.getSpecifiedPost = (req, res) => {

};

exports.getComments = (req, res) => {

};

exports.createNewComment = (req, res) => {

};