import http from './httpService'

const apiEndpoint = '/articles/'
const jwt = localStorage.getItem('token') || ''

export function getArticles() {
    return http.get(apiEndpoint)
}

export function newArticle(newArticles) {
    return http.post(apiEndpoint, {
        author: newArticles.author,
        title: newArticles.title,
        img: newArticles.img,
    }, { headers: { 'x-auth-token': jwt } })
}

export function likeArticles(articleId, user) {
    return http.put(apiEndpoint + articleId + '/like', {
        author: {},
        like: { _id: user._id, userName: user.userName }
    }, { headers: { 'x-auth-token': jwt } })
}

export function reviewArticles(articleId, user, comment) {
    return http.put(apiEndpoint + articleId, {
        author: user._id,
        comment: {
            "word": comment,
            "commentDate": new Date(),
        }
    }, { headers: { 'x-auth-token': jwt } })
}

export function shareArticles(article, user, shareWord) {
    console.log(shareWord);
    console.log(article, user);
    return http.post(apiEndpoint + article._id, {
        author: article.author._id,
        sharer: user._id,
        content: shareWord,
        title: article.title,
        img: article.img,
        oldDate: article.date
    }, { headers: { 'x-auth-token': jwt } })
}

export function deleteArticles(id) {
    return http.delete(apiEndpoint + id, { headers: { 'x-auth-token': jwt } })
}

export function deleteComment(id, comment) {
    return http.put(apiEndpoint + id + '/comment', { comment }, { headers: { 'x-auth-token': jwt } })
}

export default {
    getArticles,
    newArticle,
    likeArticles,
    shareArticles,
    reviewArticles,
    deleteArticles,
    deleteComment
}