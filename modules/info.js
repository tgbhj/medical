const info = require('../dbs/info')

async function getInfo(req, reply) {
    await info
        .find()
        .sort({ date: -1 })
        .then(cb => {
            if (cb != null) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    cb: cb
                })
            } else {
                reply.send({
                    code: 50000,
                    msg: 'Error',
                    cb: {}
                })
            }
        }, err => {
            reply.send({
                code: 50000,
                msg: err,
                cb: {}
            })
        })
}

async function saveInfo(req, reply) {
    await new info({
        company: req.body.company,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        msg: req.body.msg
    })
        .save((err, cb) => {
            if (cb != null) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50000,
                    msg: err,
                    cb: {}
                })
            }
        })
}

module.exports = { getInfo, saveInfo }