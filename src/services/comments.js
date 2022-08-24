const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('../middlewares/jwt')
const { Comment } = require('../models/comment')
const { uploadImage, deleteImage } = require('./imageService')

exports.getAllComments = async () => {
    try {
        const comments = await Comment.findAll()
        return comments
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getCommentById = async (id) => {
    try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new ErrorObject('Comment not found', 404)
        }
        return comment
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.createComment = async (token, body, files) => {
    try {
        const user = await decodeToken(token)
        body.userId = user.user.id
        if (files){
            body.image = await uploadImage(files.image)
        }
        const comment = await Comment.create(body)
        return comment
        } catch (error) {
            throw new ErrorObject(error.message, error.statusCode || 500)
        }
}

exports.updateComment = async (id, body, files) => {
    try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new ErrorObject('Comment not found', 404)
        }
        if (files){
            body.image = await uploadImage(files.image)
        }
        const updatedComment = await comment.update(body)
        return updatedComment
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deleteComment = async (id) => {
    try {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new ErrorObject('Comment not found', 404)
        }
        if (comment.image){
            await deleteImage(comment.image)
        }
        await comment.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
            
} 