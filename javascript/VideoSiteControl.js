var video_play_btn = document.querySelector('.video-play-btn');

var video_play = document.querySelector('#video-play-img');

var video_pause = document.querySelector('#video-pause-img');

var video_progress = document.querySelector('.video-progress');

var video_progressTarget = document.querySelector('.video-progress-target');

var video_notmuted = document.querySelector('#video-notmute-img');

var video_muted = document.querySelector("#video-mute-img")

var video_volumn_btn = document.querySelector('.video-volumn-btn');

var video_rate_btn = document.querySelector('.video-rate-btn');

var video_bullet_btn = document.querySelector('.video-bullet-btn');

var video_bullet_open = document.querySelector('#bullet-open-img');

var video_bullet_close = document.querySelector('#bullet-close-img');

var video_bullet = document.querySelector('.video-bullet');

var bullet_input_zone = document.querySelector('.bullet-input-zone');

var bullet_input = document.querySelector('#bullet-input');

var bullet_textcount = document.querySelector('.bullet-textcount');

var bullet_submit = document.querySelector('.bullet-submitBtn');

var videoRate = 1;
var videoMute = 0;
var videoVolumn; //占位符
var videoPlay = 0;  //视频播放状态
var videoBullet = 1; //默认打开弹幕
var detectVideo; //计时器

var bulletUserIdArray = new Array(); //  0 userid 1 happentime 2 content
var bulletHappenTimeArray = new Array();
var bulletContentArray = new Array();

bullet_input.addEventListener('focus', detectInputCount);
bullet_input.addEventListener('input', detectInputCount);
bullet_submit.addEventListener('click', postBullet);

video_play_btn.onclick = function () {
    if (videoPlay == 0) {
        video_play.style.display = 'inline-block';
        video_pause.style.display = 'none';
        videoNow.play();
        if(hascreateBullet == 0) createBullet(); //避免重复创建弹幕
        detectProgress();
        setTimeout(()=>{bulletShoot()},100) ;
        videoPlay = 1;
    }
    else {
        video_play.style.display = 'none';
        video_pause.style.display = 'inline-block';
        videoNow.pause();
        clearInterval(detectVideo);
        clearInterval(shootTheComment);
        // for (let x = 0; x < bullet_send; x++)   commentBulletSpan[x].style.display = 'none';
        // clearInterval(bulletAnimation);
        videoPlay = 0;
    }
}

video_volumn_btn.onclick = function () {
    if (videoMute == 0) {
        video_notmuted.style.display = 'none';
        video_muted.style.display = 'inline-block';
        videoMute = 1;
        videoNow.muted = videoMute;
    }
    else {
        video_notmuted.style.display = 'inline-block';
        video_muted.style.display = 'none';
        videoMute = 0;
        videoNow.muted = videoMute;
    }
}

video_volumn_btn.onclick = function () {
    if (videoMute == 0) {
        video_notmuted.style.display = 'none';
        video_muted.style.display = 'inline-block';
        videoMute = 1;
        videoNow.muted = videoMute;
    }
    else {
        video_notmuted.style.display = 'inline-block';
        video_muted.style.display = 'none';
        videoMute = 0;
        videoNow.muted = videoMute;
    }
}

video_rate_btn.onclick = function () {
    if (videoRate == 1) {
        videoRate = 1.2;
        video_rate_btn.innerHTML = videoRate + 'X';
        videoNow.playbackRate = videoRate;
    }
    else if (videoRate == 1.2) {
        videoRate = 1.5;
        video_rate_btn.innerHTML = videoRate + 'X';
        videoNow.playbackRate = videoRate;
    }
    else if (videoRate == 1.5) {
        videoRate = 2;
        video_rate_btn.innerHTML = videoRate + 'X';
        videoNow.playbackRate = videoRate;
    }
    else if (videoRate == 2) {
        videoRate = 1;
        video_rate_btn.innerHTML = videoRate + 'X';
        videoNow.playbackRate = videoRate;
    }
}

video_bullet_btn.onclick = function () {
    if (videoBullet == 1) {
        video_bullet_close.style.display = 'inline-block';
        video_bullet_open.style.display = 'none';
        bullet_input_zone.style.display = "none";
        videoBullet = 0;
    }
    else {
        video_bullet_close.style.display = 'none';
        video_bullet_open.style.display = 'inline-block';
        videoBullet = 1;
    }
}

video_bullet.onclick = function () {
    if (isLogined == 0) {
        alert("未登录！");
        return;
    }
    if (videoBullet == 0) {
        alert('请先打开弹幕功能');
        return;
    }
    if (bullet_input_zone.style.display == "none" ) {
        bullet_input_zone.style.display = 'inline-block';
    }
    else {
        bullet_input_zone.style.display = "none";
    }
}

function detectInputCount() {
    if (!bullet_input.value.length) {
        bullet_submit.style.backgroundColor = '#808281';
        bullet_submit.style.cursor = 'default';
    }
    else {
        bullet_submit.style.backgroundColor = '#4397f7';
        bullet_submit.style.cursor = 'pointer';
    }
    bullet_textcount.innerHTML = bullet_input.value.length + '/20';
}

async function postBullet() {
    var submit_body = {
        'happenTime':((videoNow.currentTime*1000)|0),
        'content': bullet_input.value,
        'episodeId': episodeNid
    };
    myHeaders.append("Content-type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(submit_body),
    };
    var urlBullet = url + '/barrage';
    var Data;
    await fetch(urlBullet, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in postBullet()");
            }
        })
    Data.then(result => {
        if (result.data == '添加成功') {
            alert('成功发布');
            bullet_input.value = '';
            bullet_input_zone.style.display = 'none';
        }
    })
}

async function getBullet() {
    var urlGetBullet = url + '/barrage' + "?episodeId=" + episodeNid;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    await fetch(urlGetBullet, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in getBullet()");
            }
        })
    Data.then(result => {
        if (!result.data.length) return;
        for (let x = 0; x < result.data.length; x++){
            // console.log(result.data[x].userId);
            bulletUserIdArray[x] = result.data[x].userId;
            bulletHappenTimeArray[x] = result.data[x].happenTime;
            bulletContentArray[x] = result.data[x].content;
        }
    })
        .then(() => {
            // createBullet();
            // bulletShoot();
    })
}


function videoPlayFuntion() {
    var videoduramin = (videoNow.duration / 60) | 0;
    var videodurasec = ((videoNow.duration) % 60) | 0;
    // console.log(videodurasec);
    //视频播放状态 默认暂停
    video_play.style.display = 'none';
    video_pause.style.display = 'inline-block';
    videoNow.pause();
    clearInterval(detectVideo);
    videoPlay = 0;
    //视频静音状态（更换剧集记忆）
    if (videoMute == 0) {
        video_notmuted.style.display = 'inline-block';
        video_muted.style.display = 'none';
    }
    //视频播放速度（更换剧集记忆）
    video_rate_btn.innerHTML = videoNow.playbackRate + 'X';
    videoNow.playbackRate = videoRate;
    //弹幕默认打开状态
    video_bullet_close.style.display = 'none';
    video_bullet_open.style.display = 'inline-block';
    videoBullet = 1;
    (((videodurasec / 100) | 0)) ? videodurasec = String(videodurasec) : videodurasec = '0' + String(videodurasec); //前导0
    var videomin = '0';
    var videosec = '00';
    video_progress.innerHTML = videomin + ':' + videosec + " " + "/" + " " + videoduramin + ":" + videodurasec;
    video_progressTarget.style.width = 0 + '%';
}
// videoPlayFuntion(); //初始化

function detectProgress() {
    var videoduramin = (videoNow.duration / 60) | 0;
    var videodurasec = (videoNow.duration % 60) | 0;
    ((videodurasec / 10) | 0) ? videodurasec = String(videodurasec) : videodurasec = '0' + String(videodurasec);
    detectVideo = setInterval(() => {
        var videomin = (videoNow.currentTime / 60) | 0;
        var videosec = (videoNow.currentTime % 60) | 0;
        (((videosec / 10) | 0)) ? videosec = String(videosec) : videosec = '0' + String(videosec);  //前导0
        video_progress.innerHTML = videomin + ':' + videosec + " " + "/" + " " + videoduramin + ":" + videodurasec;
        video_progressTarget.style.width = 100 * (videoNow.currentTime / videoNow.duration) + '%';
        if (videoNow.currentTime == videoNow.duration) {
            video_play.style.display = 'none';
            video_pause.style.display = 'inline-block';
            videoPlay = 0;
            videoNow.currentTime = 0;
        }
    }, 100)
}

document.querySelector(".video").onclick = function () {
    //进入全屏
    videoNow.webkitRequestFullScreen();
}
