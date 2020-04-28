const Info = require('../dbs/info')

async function getInfo(req, reply) {
    await Info
        .findAll({ order: [['id', 'DESC']] })
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
        })
}

async function saveInfo(req, reply) {
    await Info
        .create({
            company: req.body.company,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            msg: req.body.msg
        })
        .then(cb => {
            if (cb != null) {
                reply.send({
                    code: 20000,
                    msg: 'Success',
                    cb: {}
                })
            } else {
                reply.send({
                    code: 50000,
                    msg: 'Error',
                    cb: {}
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = { getInfo, saveInfo }