const { Op } = require('sequelize')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('../middlewares/jwt')
const { Comment } = require('../models/comment')
const { Post } = require('../models/post')
const { uploadImage, deleteImage } = require('./imageService')

exports.getAllPost = async (content) => {
    try {
        let where = {}
        if(content){
            where.content = {[Op.like]: '%'+content+'%'}
        }
        return await Post.findAll({
            where,
            attributes: ["userId", "content", "images"]
        })
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getPostById = async (id) => {
    try {
        const post = await Post.findAll({
            where: {id: id},
            include: Comment
        })
        if(!post){
            throw new ErrorObject('Post not found', 404)
        }
        return post
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.createPost = async (token, body, files) => {
    try {
        const user = await decodeToken(token)
        body.userId = user.user.id
        if (files){
            body.images = await uploadImage(files.image)
        }
        const post = await Post.create(body)
        return post
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.updatePost = async (id, body, files) => {
    try {
        const existantPost = await Post.findByPk(id)
        if (!existantPost){
            throw new ErrorObject('Post not found', 404)
        }
        if (files){
            body.images = await uploadImage(files.image)
        }
        const newPost = await existantPost.update(body)
        return newPost
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deletePost = async (id) => {
    try {
        const response = await this.getPostComments(id)
        if(!response){
            throw new ErrorObject('Post not found', 404)
        }
        if (response.comments){
            await this.deleteCommentsOfPost(id)
        }
        if(response.post.images){
            await deleteImage(response.post.images)
        }
        await Post.destroy({ where: { id: id }})
       
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

exports.deleteCommentsOfPost = async (id) => {
    try {
        await Comment.destroy({ where: { postId: id }})
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}