const fastify = require('fastify')({ logger: { level: 'info' } })
const path = require('path')
const fastifyStatic = require('fastify-static')
const serveStatic = require('serve-static')
const info = require('./routes/info')

fastify
    .register(info, { prefix: '/' })
    .use(serveStatic('./__static'))
    .register(fastifyStatic, {
        root: path.join(__dirname, '__static'),
        prefix: '/__static/'
    })
    .get('/*', (req, reply) => {
        reply.sendFile('index.html')
    })
    .setErrorHandler((error, req, reply) => {
        if (error.validation) {
            reply.status(200).send({
                code: 40000,
                msg: '缺少参数',
                err: error.validation[0].message,
                cb: {}
            })
        }
    })
    .listen(9000, '0.0.0.0')
    .then(() => console.log('Server Start Success'))
    .catch(error => {
        console.log(`Server Start Error: ${error}`)
        process.exit(1)
    })