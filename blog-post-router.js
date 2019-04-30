const express = require('express');
const router = express.Router();
const {ListPosts} = require('./blog-post-model');

router.get('/blog-posts',(req, res, next) => {
    ListPosts.get()
        .then( posts => {
            res.status(200).json({
                message: "Successfully sent the list of posts",
                status : 200,
                posts : posts
            });
        }).catch( err => {
            res.status(500).json({
                message: "Internal server error",
                status : 500
            });
            return next();
        });;

});

router.get('/blog-posts/:author', (req, res, next) => {
    let received_author = req.params.author;

    if(!received_author)
    {
        res.status(406).json({
            message: "Missing author field",
            status: 406,
        });
        return next();      
    }

    ListPosts.get_with_author(received_author)
        .then( posts => {
            if(posts.length > 0) {
                res.status(200).json({
                    message: "Successfully sent the list of posts",
                    status : 200,
                    posts : posts
                });
            }
            else {
                res.status(404).json({
                    message: "Post not found in the list",
                    status: 404
                });
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "Internal server error",
                status : 500
            });
            return next();
        });;

});

router.post('/blog-posts', (req, res, next) => {
    let received_title = req.body.title;
    let received_content = req.body.content;
    let received_author = req.body.author;
    let received_publishDate = req.body.publishDate;

    if (!received_title | !received_content | !received_author | !received_publishDate)
    {
        res.status(406).json({
            message: "Missing field(s)",
            status: 406,
        });
        return next();
    }
    else
    {
        let date_parts = received_publishDate.split(" ");
        
        ListPosts.post(received_title, received_content, received_author, date_parts)
            .then(post => {
                res.status(201).json({
                    message : "Successfully added the post",
                    status : 201,
                    post : post
                })
            }).catch( err => {
                    res.status(500).json({
                        message: "Internal server error",
                        status : 500
                    });
                    return next();
            });
    }
});

router.delete('/blog-posts/:id*?', (req, res, next) =>{
    let received_id = req.params.id;
    let received_idBody = req.body.id;

    if(!received_id | !received_idBody | received_id != received_idBody)
    {
        res.status(406).json({
            message: "Missing or different ID field(s)",
            status: 406
        });
        return next();
    }
    else
    {
        ListPosts.delete(received_id)
            .then(post => {
                if(post) {
                    res.status(204).json({
                        message : "Successfully added the post",
                        status : 204,
                    });
                    return next();
                }
                else
                {
                    res.status(404).json({
                        message : "Post not found in the list",
                        status : 404
                    });
                    return next();                  
                }
            }).catch( err => {
                    res.status(500).json({
                        message: "Internal server error",
                        status : 500
                    });
                    return next();
            });
    }
});

router.put('/blog-posts/:id*?', (req, res, next) => {
    let received_id = req.params.id;

    if(!received_id)
    {
        res.status(406).json({
            message: "Missing ID field",
            status: 406,
        });
        return next();       
    }
    else
    {
        let received_title = req.body.title;
        let received_content = req.body.content;
        let received_author = req.body.author;
        let received_publishDate = req.body.publishDate;

        if (!received_title && !received_content && !received_author && !received_publishDate)
        {
            res.status(406).json({
                message: "No entered fields on body",
                status: 406,
            });
            return next();
        }
        else
        {
            ListPosts.put(received_id, received_title, received_content, received_author, received_publishDate)
                .then(posts => {
                    if(posts) {
                        res.status(200).json({
                            message : "Successfully updated the post",
                            status : 200,
                            post : posts
                        });
                        return next();
                    }
                    else {
                        res.status(404).json({
                            message : "Post not found in the list",
                            status : 404
                        });
                        return next();
                    }
                })
                .catch( err => {
                    res.status(500).json({
                        message: "Internal server error",
                        status : 500
                    });
                    return next();
                });

        }        
    }
});

module.exports = router;