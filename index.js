const Hapi = require('@hapi/hapi');
const ytdl = require('ytdl-core');
const Ammo = require('@hapi/ammo');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return `<video src="/v" controls="controls">\
        您的浏览器不支持 video 标签。\
        </video>`
    }
})


server.route({
    method: 'GET',
    path: '/v',
    handler: async (request, h) => {

        let requestRange = request.headers.range;
        const video = ytdl('3PWMgQFVVO8');
        let totalLenth = 13070716;
        let range = Ammo.header(requestRange, totalLenth)[0]
        console.log('range:', range)
        const start = range.from;
        const end = range.to;
        const stream = new Ammo.Clip(range)
        video.pipe(stream)
        return h
            .response(stream)
            .code(206)
            .header('Content-Range', 'bytes ' + start + '-' + end + '/' + totalLenth)
            .header('Content-Length', start == end ? 0 : (end - start + 1))
            .header('Content-Type', 'video/mp4')
            .header('Accept-Ranges', 'bytes')
            .header('Cache-Control', 'no-cache')
    }
})


const init = async () => {
    await server.start()
    console.log(`server running at:${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()