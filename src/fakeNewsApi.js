

const article = [
    {
        id: 1,
        portrait: "https://qlogo1.store.qq.com/qzone/1303140304/1303140304/50?1527840070",
        userId: "Fcater",
        date: "",
        title: "看起来1米8的阿猫",
        img: "http://photogz.photo.store.qq.com/psc?/V11wzYiE1psYPo/ruAMsa53pVQWN7FLK88i5hXq88iLrHdSIZ0qpztLqJcRNOi*35E5tgqP3BaaEoO91E0PdUlyJ63QEeTVV2OHzZJ.0XMFtGUctAbLn70CdVA!/b&bo=QAZaCEAGWggBByA!&rf=viewer_4",

        content: "",
        liked: false,
        disliked: false,
        talk: false,
        share: false,
        likedNum: 12,
        comment: [{
            id: 1,
            userId: 'Fcater',
            portrait: 'https://qlogo1.store.qq.com/qzone/1303140304/1303140304/50?1527840070',
            content: '好帅啊！'
        },]
    }
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