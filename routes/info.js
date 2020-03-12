const { getInfo, saveInfo } = require('../modules/info')

module.exports = async fastify => {
    fastify
        .post('/info', {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        company: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        phone: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        msg: {
                            type: 'string'
                        }
                    },
                    required: ['company', 'name', 'phone', 'email', 'msg']
                }
            }
        }, async (req, reply) => {
            await saveInfo(req, reply)
        })
        .get('/info', async (req, reply) => {
            await getInfo(req, reply)
        })
}