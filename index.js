const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const users = require('./routs/users')
const articles = require('./routs/articles')
const auth = require('./routs/auth')
const app = express()


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-auth-token,Content-Type,Access-Token,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
//设置跨域访问的header

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
//设置传输文件的最大值为50mb

app.use(express.json())
app.use('/api/users', users)
app.use('/api/articles', articles)
app.use('/api/auth', auth)

if (!config.get('jwtPrivateKey')) {
    console.error('环境变量私钥未定义.');
    process.exit(1)
}
//如果未配置环境变量，则无法生成webtoken
//$env:bbs_jwtPrivateKey="fcSecureKey"

mongoose.set('useFindAndModify', false)
// if (!config.get('db')) {
//     console.error('数据库信息未定义');
// }

mongoose.connect("mongodb://localhost/bbs-demo", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("正在连接数据库"))
    .catch((err) => console.log("无法连接数据库", err))

const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`正在监听${port}端口`); })
//设置端口 $env: PORT = 6000