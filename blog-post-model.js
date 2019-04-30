const uuid = require('uuid');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let blogSchema = mongoose.Schema({
    id : {type : String, required : true, unique : true},
    title : {type : String, required : true, unique : true},
    content : {type : String, required : true},
    author : {type : String, required : true},
    publishDate : {type : Date, required : true}
});

let Blogs = mongoose.model("Blogs", blogSchema);

const ListPosts = {
    get: function() {
        return Blogs.find()
            .then(blogs => {
                return blogs;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    get_with_author : function(author_name) {
        return Blogs.find({author : author_name})
            .then(blogs => {
                return blogs;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    post : function(received_title, received_content, received_author, date_parts) {
        let newPost = {
            id: uuid.v4(),
            title: received_title,
            content: received_content,
            author: received_author,
            publishDate: new Date(date_parts[0], date_parts[1] -1, date_parts[2])
        };

        return Blogs.create(newPost)
            .then(blog => {
                return blog;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    delete : function(received_id) {
        return Blogs.findOneAndDelete({id : received_id})
            .then(blog => {
                return blog;
            })
            .catch(err => {
                throw new Error(err);
            });

    },
    put : function(received_id, received_title, received_content, received_author, received_publishDate) {
        let toUpdate = {};

        if (received_title)
            toUpdate.title = received_title;
        if (received_content)
            toUpdate.content = received_content;
        if (received_author)
            toUpdate.author = received_author;
        if (received_publishDate)
            toUpdate.publishDate = received_publishDate;

        toUpdate = {$set : toUpdate}

        return Blogs.findOneAndUpdate({id : received_id}, toUpdate, {new : true})
            .then(blog => {
                        return blog;
                    })
                    .catch(err => {
                        throw new Error(err);
                    }); 


        /*
        if(received_title)
        {
            return Blogs.findOneAndUpdate({id : received_id}, {$set : {title : received_title}}, {new : true})
                .then(blog => {
                    return blog;
                })
                .catch(err => {
                    throw new Error(err);
                });                    
        }

        if(received_content)
        {
            return Blogs.findOneAndUpdate({id : received_id}, {$set : {content : received_content}}, {new : true})
                .then(blog => {
                    return blog;
                })
                .catch(err => {
                    throw new Error(err);
                });                     
        }  

        if(received_author)
        {
            return Blogs.findOneAndUpdate({id : received_id}, {$set : {author : received_author}}, {new : true})
                .then(blog => {
                    return blog;
                })
                .catch(err => {
                    throw new Error(err);
                }); 
        }

        if(received_publishDate)
        {
            let date_parts = received_publishDate.split(" ");
            newDate = new Date(date_parts[0], date_parts[1] -1, date_parts[2]);

            return Blogs.findOneAndUpdate({id : received_id}, {$set : {title : newDate}}, {new : true})
                .then(blog => {
                    return blog;
                })
                .catch(err => {
                    throw new Error(err);
                }); 
        }
        */
    }
}
module.exports = {ListPosts};