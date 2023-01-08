const Post = require('../models/posts.js');
const Comment = require('../models/comments.js');

exports.getAllPosts = (req, res) => {
  Post.find({}, 'title published img about category date _id', (error, posts) => {
    if(error) return res.status(500).json(error);
    res.json({posts});
  });
};
exports.createPost = (req, res) => {
 const {title, content, img, about, category} = req.body;
  if(!title || !content || !img || !about || !category){
   return res.json({error:{
        title: title ? null : 'Title must be provided',
        content: content ? null : 'Content must be provided',
        img: img ? null : 'Image URL must be provided',
        about: about ? null : 'About must be provided',
        category: category ? null : 'Category must be provided',
      },
      code:400
    });
  }

  const post = new Post({
    title,
    content,
    published: Boolean(req.body.publish),
    img,
    about,
    category,
    date: new Date()
  });

  post.save(error => {
    if(error) return res.status(502).json({error});
    res.json({error:null, code:201});
  });
};

exports.getSpecifiedPost = (req, res) => {
  Post.findById(req.params.postId, (error, post) => {
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

exports.updatePost = (req, res) => {
  const {title, content, img, about, category} = req.body;
  if(!title || !content || !img || !about || !category){
    return res.json({error:{
        title: title ? null : 'Title must be provided',
        content: content ? null : 'Content must be provided',
        img: img ? null : 'Image URL must be provided',
        about: about ? null : 'Introduction must be provided',
        category: category ? null : 'Category must be provided',
      },
      code:400
    });
  }

  Post.findById(req.params.postId, (err, oldPost) => {
    if(err) res.status(500).json(err);
    if(!oldPost) return res.status(400).json({error: `No post exist with id ${req.params.postId}`, code:400});

    const post = new Post({
      _id: req.params.postId,
      title,
      content,
      published: Boolean(req.body.publish),
      img,
      about,
      category,
      date: new Date()
    });
  
    Post.findByIdAndUpdate(req.params.postId, post, {}, (error) => {
      if(error) return res.status(502).json({error});
      res.json({error:null, code:201});
    });
  });  
};

exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, err => {
    if(err) return res.status(500).json(err);
    res.status(201).send();
  });
};
