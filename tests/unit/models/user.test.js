const {User} = require('../../../module/user')
const jwt =  require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')

describe('user.generateAuthToken',() => {
    it('返回一个合法的jwt',() => {
        const payload = {
            _id:new mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
        }
        const user = new User(payload)
        const token = user.generateAuthToken()
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject(payload)
    })
})