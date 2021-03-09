const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Article, validate } = require('../module/article')
const express = require('express')
const router = express.Router()

getModifiedArticle = () => {
    return Article
        .find()
        .populate('author', 'userName portrait _id')
        .populate('sharer', 'userName portrait _id')
        .populate({ path: 'comment', populate: { path: "author", select: '_id userName portrait' } })
        .sort('-date')
}
//从数据库获取所有文章，并将作者ID填充为作者对象

router.get('/', async (req, res) => {
    const articles = await getModifiedArticle()
    res.send(articles)
})


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (!req.body.img) req.body.img = ""
    if (!req.body.title) req.body.title = "发表图片"

    try {
        let article = new Article({
            sharer: null,
            author: req.body.author,
            title: req.body.title,
            img: req.body.img
        })
        await article.save()
        const articles = await getModifiedArticle()
        res.send(articles)
    }
    catch (ex) {
        res.status(400).send(ex);
    }

})
//发表新文章，返回所有文章

router.post('/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (!req.body.img) req.body.img = ""
    if (!req.body.title) req.body.title = "发表图片"
    if (!req.body.content) req.body.cotent = "''"

    try {
        let article = new Article({
            content: req.body.content,
            author: req.body.author,
            sharer: req.body.sharer,
            title: req.body.title,
            img: req.body.img,
            oldDate: req.body.oldDate
        })
        await article.save()
        const articles = await getModifiedArticle()
        res.send(articles)
    }
    catch (ex) {
        res.status(400).send(ex);
    }

})
//转发文章，返回所有文章

router.put('/:id/like', auth, async (req, res) => {
    let article = await Article.findById(req.params.id)
    if (!article) return res.status(404).send('文章不存在');

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const articleToUpdate = await Article.findById(req.params.id)
        articleToUpdate.like.push(req.body.like)
        article = await Article.findByIdAndUpdate(req.params.id,
            {
                like: articleToUpdate.like,
            }, {
            new: true
        })
        if (!article) return res.status(404).send('该文章不存在.')
        res.send(article)

    }
    catch (ex) {
        console.log(ex);
        return res.status(404).send(ex)
    }
})
//点赞文章

router.put('/:id', auth, async (req, res) => {
    let article = await Article.findById(req.params.id)
    if (!article) return res.status(404).send('文章不存在');

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const articleToUpdate = await Article.findById(req.params.id)
        Article.find
        obj = {
            author: req.body.author,
            portrait: req.body.comment.portrait,
            word: req.body.comment.word,
            commentDate: req.body.comment.commentDate
        }
        articleToUpdate.comment.push(obj)

        article = await Article.findByIdAndUpdate(req.params.id,
            {
                comment: articleToUpdate.comment,
            }, {
            new: true
        })
        if (!article) return res.status(404).send('该文章不存在.')
        res.send(article.comment)

    }
    catch (ex) {
        console.log(ex);
        return res.status(404).send(ex)
    }
})
//评论文章

router.delete('/:id', [auth], async (req, res) => {
    try {
        const articleToDelete = await Article.findById(req.params.id)
        articleId = articleToDelete.sharer ? articleToDelete.sharer._id : articleToDelete.author._id
        if (req.user._id === articleId.toString() || "5ff519c79a60243a10ca80e1") {
            const article = await Article.findByIdAndRemove(req.params.id)
            if (!article) return res.status(404).send('动态不存在.')
            const articles = await getModifiedArticle()
            res.send(articles)
            //返回删除后剩下的文章
        }
        else {
            console.log('非本人操作');
            res.status(401).send('非本人操作！')
        }
    }
    catch (ex) {
        return res.status(404).send(ex)
    }
})
//删除文章（本人或管理员）

router.put('/:id/comment', [auth], async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        const newComment = article.comment.filter(c => c._id.toString() !== req.body.comment._id)
        const commentToDelete = article.comment.find(c => (c._id.toString() === req.body.comment._id))
        if (req.user._id === article.author._id.toString() || commentToDelete.author._id.toString() || "5ff519c79a60243a10ca80e1") {
            const article = await Article.findByIdAndUpdate(req.params.id, {
                comment: newComment
            })
            const articles = await getModifiedArticle()
            res.send(articles)
            if (!article) return res.status(404).send('动态不存在.')
        }
        else {
            res.status(401).send('非本人操作！')
        }
    }
    catch (ex) {
        console.log(ex);
        return res.status(404).send(ex)
    }
})
//删除评论（本人）


module.exports = router