const mongoose = require('mongoose')

const infoSchema = mongoose.Schema({
    company: String, //公司名称
    name: String, //联系人姓名
    phone: String, //联系人电话
    email: String, //联系人邮箱
    msg: String, //联系人留言
    date: { type: Date, default: Date.now } //提交日期时间
})

const info = mongoose.model('info', infoSchema)

module.exports = info