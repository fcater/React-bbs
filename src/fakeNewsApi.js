

const article = [
    {
        id: 1,
        portrait: "http://r.photo.store.qq.com/psc?/V11wzYiE4Hy8dT/45NBuzDIW489QBoVep5mcXCCE9BbMyCwxJqW3B8V1hJ4SOOGGlQN36EpQZnbRRCLmhBSiOyHu9ockdCy0f3C7QTRW*YFS5BKF8Ote*IfNLQ!/r",
        userId: "Fcater",
        date: "",
        title: "可爱猫咪",
        img: "http://r.photo.store.qq.com/psb?/V11wzYiE46AFvN/7LV2OWrUukaj8vlJLkuXL2BRdWy43l.iA5G216QtiYY!/r/dGgAAAAAAAAA",
        content: "",
        shareBox: false,
        liked: false,
        disliked: false,
        talk: false,
        share: false,
        focusHeight: 1,
        likedNum: 12,
        comment: [{
            id: 1,
            userId: 'Fcater',
            portrait: 'http://r.photo.store.qq.com/psc?/V11wzYiE4Hy8dT/45NBuzDIW489QBoVep5mcXCCE9BbMyCwxJqW3B8V1hJ4SOOGGlQN36EpQZnbRRCLmhBSiOyHu9ockdCy0f3C7QTRW*YFS5BKF8Ote*IfNLQ!/r',
            content: '好可爱啊！'
        },]
    },
]


export function getArticles() {
    return article
}

export function getArticle(id) {
    return article.find(a => a.id === id)
}

export function deleteArticle(id) {
    console.log(id);
}