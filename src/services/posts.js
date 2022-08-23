const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('../middlewares/jwt')
const { Comment } = require('../models/comment')
const { Post } = require('../models/post')

exports.getAllPost = async () => {
    try {
        const post = await Post.findAll()
        return post
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getPostById = async (id) => {
    try {
        const post = await Post.findByPk(id)
        if(!post){
            throw new ErrorObject('Post not found', 404)
        }
        return post
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.createPost = async (token, body) => {
    try {
        const user = await decodeToken(token)
        body.userId = user.user.id
        const post = await Post.create(body)
        return post
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.updatePost = async (id, body) => {
    try {
        const existantPost = await Post.findByPk(id)
        if (!existantPost){
            throw new ErrorObject('Post not found', 404)
        }
        const newPost = await existantPost.update(body)
        return newPost
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deletePost = async (id) => {
    try {
        const post = await Post.findByPk(id)
        if(!post){
            throw new ErrorObject('Post not found', 404)
        }
        await post.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getPostComments = async (id) => {
    try {
        const post = await this.getPostById(id)
        const comments = await Comment.findAll({ where: { postId: id }})
        if (!comments){
            throw new ErrorObject('There are no comments', 404)
        }
        return {
            post,
            comments
        }
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}