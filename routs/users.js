const _ = require('lodash')
const bcypt = require('bcrypt')
const express = require('express')
const { User, validate } = require('../module/user')
const { Article } = require('../module/article')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()

router.get('/', [auth, admin], async (req, res) => {
    const user = await User.find().sort('date')
    res.send(user)
})
//获取所有用户所有信息（管理员）

router.get('/id', async (req, res) => {
    const user = await User.find().sort('date').select('_id')
    res.send(user)
})
//获取所有用户仅Id

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})
//获取自己信息

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //Joi验证
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("此邮箱已经注册过了")

    user = new User(_.pick(req.body, [
        'userName',
        'email',
        'password',
        'sex',
        'portrait',
    ]))
    //用户框架
    const salt = await bcypt.genSalt(10)
    user.password = await bcypt.hash(user.password, salt)
    await user.save()
    //加密密码
    const token = user.generateAuthToken()
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ["_id", "userName", "email", 'sex']))
})
//注册用户

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const male = 'http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcRhYzOh7blj8b4vyz73NEfEvmuDUogSvTSLg*hXX4KIRfH2L9eQZZt47ftNzFljRVkWcZAONJa7YDfKgWrxwfVk!/r'
    req.body.sex = req.body.sex || false
    req.body.portrait = req.body.portrait || male
    //如果更新时未设置性别和头像，则默认男性和默认男头像
    const salt = await bcypt.genSalt(10)
    req.body.password = await bcypt.hash(req.body.password, salt)
    //加密密码

    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                userName: req.body.userName,
                password: req.body.password,
                sex: req.body.sex,
                portrait: req.body.portrait
            },
            {
                new: true
            })
        const token = user.generateAuthToken()
        res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send(_.pick(user, ["_id", "userName", "email", 'sex']))

    }
    catch (ex) {
        return res.status(404).send('指定ID的用户不存在.')
    }
})
//修改用户信息

router.delete('/:id', [auth, admin], async (req, res) => {
    const nobody = "5ffc2e9880aa87ceaca0364a"
    try {
        const userArticle = await Article.find({ author: req.params.id }).select('author')
        userArticle.forEach(async function (article) {
            await Article.findByIdAndUpdate(article._id, { author: nobody, title: "文明用语", img: "http://r.photo.store.qq.com/psc?/V51bnX3g1QbK7d02RrSs1Qs2Er0PnVRY/45NBuzDIW489QBoVep5mcdgQQLy53zY4hulquborztGKSIzFQ8WhEkRFaSC.k*NrtA0BaAYDMVRZ29.m0geFsY.TaiPPIWzM4Yqbv211MTQ!/r" })
        })
        await User.findByIdAndRemove(req.params.id)
        userList = await User.find().sort('userName')
        res.send(userList)
    }
    catch (ex) {
        return res.status(404).send('该用户不存在')
    }

})
//删除用户（管理员）


module.exports = router