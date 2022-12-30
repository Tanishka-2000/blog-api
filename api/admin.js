const express = require('express');
let router = express.Router();

const admin = require('../controller/admin.js');


router.get('/posts', admin.getAllPosts);

router.post('/posts', admin.createPost);

router.get('/posts/:postId', admin.getSpecifiedPost);

router.put('/posts/:postId', admin.updatePost);

router.get('/posts/:postId/comments', admin.getComments);

router.delete('/posts/:postId/comments/:commentId', admin.deleteComment);

module.exports = router;