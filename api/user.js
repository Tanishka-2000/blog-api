const express = require('express');
const router = express.Router();

// for readers
router.get('/posts', getPosts);

router.get('/posts:postId', getSpecificPost);

router.get('/posts/:postId/comments', getcomments);

router.post('/posts/:postId/comments', createNewComment);

// for admin
router.get('/admin/posts', getPostsForAdmin);

router.get('/admin/posts:postId', getSpecificPostForAdmin);

router.get('/admin/posts/:postId/comments', getcommentsForAdmin);

router.put('/admin/posts/:postId', updatePost);

router.delete('/admin/posts/:postId/comments/:commentId', deleteComment);