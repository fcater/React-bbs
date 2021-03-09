const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')

const female = 'http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcSUoyRTjJXjplCxOd6PubtCMnoA7X5TRImnr3nUzAOTZLZ8zKV5WZ51t5lhpeKEHhSWnSB5cbAh7HbqFSjr5Iew!/r'
const male = 'http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcRhYzOh7blj8b4vyz73NEfEvmuDUogSvTSLg*hXX4KIRfH2L9eQZZt47ftNzFljRVkWcZAONJa7YDfKgWrxwfVk!/r'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },
    sex: { type: Boolean, default: false },
    portrait: {
        type: String,
        default: function () { return this.sex ? female : male }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    registrationrDate: {
        type: Date,
        default: Date.now
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        sex: this.sex,
        registrationrDate: this.registrationrDate,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(3).max(10).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        sex: Joi.boolean(),
        portrait: Joi.string().trim().min(3),
        isAdmin: Joi.boolean(),
    })
    return schema.validate(user)
}

exports.userSchema = userSchema
exports.User = User
exports.validate = validateUser