const express = require ('express');
const router = express.Router()


const {Poster, getAllPosts, findPostById, updatePostById , deletePostById} = require ("../controller/one");


router.post("/post",Poster)


// GET /books: Retrieve all books
router.get ("/post" , getAllPosts)

router.get('/post/:id', findPostById);


// Update a specific post by ID
router.put('/post/:id', updatePostById);


// Delete a specific post by ID
router.delete('/post/:id', deletePostById);

















module.exports = router;