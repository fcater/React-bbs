const article = [
    {
        id: 1,
        datelabel: gettime(),
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
        focus: 1,
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

export function gettime() {
    const date = new Date();
    const newdate = date.toLocaleString("chinese", { hour12: false });
    const datelabel =
        newdate.slice(5, 7) +
        "月" +
        newdate.slice(8, 10) +
        "日 " +
        newdate.slice(11, 16);
    return datelabel;
};



export function getArticles() {
    return article
}

export function getArticleDemo() {
    return {
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
        focus: 1,
        focusHeight: 1,
        likedNum: 12,
        comment: [{
            id: 1,
            userId: 'Fcater',
            portrait: 'http://r.photo.store.qq.com/psc?/V11wzYiE4Hy8dT/45NBuzDIW489QBoVep5mcXCCE9BbMyCwxJqW3B8V1hJ4SOOGGlQN36EpQZnbRRCLmhBSiOyHu9ockdCy0f3C7QTRW*YFS5BKF8Ote*IfNLQ!/r',
            content: '好可爱啊！'
        },]
    }
}

export function getArticle(id) {
    return article.find(a => a.id === id)
}

export function deleteArticle(id) {
    console.log(id);
}