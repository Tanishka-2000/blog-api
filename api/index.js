const express = require('express');
let router = express.Router();

const user = require('../controller/user.js');
const admin = require('../controller/admin.js');

// for readers
router.get('/posts', user.getAllPosts);

router.get('/posts/:postId', user.getSpecifiedPost);

router.get('/posts/:postId/comments', user.getComments);

router.post('/posts/:postId/comments', user.createNewComment);

// for admin
router.post('/admin/login', admin.logUser);

router.get('/admin/posts', admin.getAllPosts);

router.get('/admin/posts/:postId', admin.getSpecifiedPost);

router.put('/admin/posts/:postId', admin.updatePost);

router.get('/admin/posts/:postId/comments', admin.getComments);

router.delete('/admin/posts/:postId/comments/:commentId', admin.deleteComment);

module.exports = router;