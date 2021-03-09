const Joi = require('joi')
const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    oldDate: String,
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    img: {
        type: String,
        trim: true
    },
    like: {
        type: [mongoose.Schema.Types.Mixed],
        default: [mongoose.Schema.Types.Mixed]
    },
    comment: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        portrait: String,
        word: String,
        commentDate: Date,
    }],
    content: {
        type: String,
        trim: true,
        maxlength: 20
    },
    date: { type: Date, default: Date.now },
})

const Article = mongoose.model('Article', articleSchema)

function validateArticle(article) {
    const schema = Joi.object({
        author: Joi.required(),
        sharer: Joi.string(),
        title: Joi.string().allow('').trim().max(50),
        img: Joi.any(),
        like: Joi.object({
            _id: Joi.string().trim(),
            userName: Joi.string().trim()
        }),
        comment: Joi.object({ word: Joi.string().max(255), commentDate: Joi.date(), }),
        content: Joi.string().allow('').trim().max(20),
        oldDate: Joi.string()
    })
    return schema.validate(article)
}


exports.Article = Article
exports.validate = validateArticle


