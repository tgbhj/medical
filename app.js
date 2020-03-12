const fastify = require('fastify')({ logger: { level: 'info' } })
const path = require('path')
const fastifyStatic = require('fastify-static')
const serveStatic = require('serve-static')
const info = require('./routes/info')
// const {mongoHost, mongoPort, mongoDataBase, httpPort, mongoUser, mongoPass} = require('./config/index')
const { mongoHost, mongoPort, mongoDataBase, httpPort } = require('./config/index')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
// mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDataBase}`, {
mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDataBase}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 1
}).then(() => {
    console.log('MongoDB Connect Success')
}, error => {
    console.log(`MongoDB Connect Failed: ${error}`)
})

fastify
    .register(info, { prefix: '/' })
    .use(serveStatic('./build'))
    .register(fastifyStatic, {
        root: path.join(__dirname, 'build'),
        prefix: '/build/'
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
    .listen(httpPort, '0.0.0.0')
    .then(() => console.log('Server Start Success'))
    .catch(error => {
        console.log(`Server Start Error: ${error}`)
        process.exit(1)
    })