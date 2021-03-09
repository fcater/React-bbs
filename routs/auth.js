const Joi = require('joi')
const bcypt = require('bcrypt')
const { User } = require('../module/user')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //Joi验证
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("邮箱或密码错误")

    const validPassword = await bcypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("邮箱或密码错误")

    const token = user.generateAuthToken()
    res.send(token)
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string().min(6).max(255).required(),
    })
    return schema.validate(req)
}

module.exports = router