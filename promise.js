const ytdl = require('ytdl-core');

const pr = new Promise((res,rej)=>{
    const video = ytdl('3PWMgQFVVO8');
    let cl = 0;
    video.once('progress',(a,b,c)=>{
        cl = c;
        res(cl)
    })
})

pr.then((cl)=>console.log(cl)).catch((e)=>console.log(e))