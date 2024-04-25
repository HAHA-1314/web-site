var mute_btn = document.querySelector('.mute-btn');

var notmuted = document.querySelector('#video-notmuted');

var muted = document.querySelector("#video-muted");

var indexVideo = document.querySelector('#index-video');

var videoBtn = document.querySelector(".video-btn");

const indexVideoname = document.querySelector("#video-name");

const indexVideotag = document.querySelector("#video-tag");

const indexVideobrief = document.querySelector("#video-brief");

const indexVideoimg_1 = document.querySelector("#img-pic-1");

const indexVideoname_1 = document.querySelector("#img-name-1");

const indexVideoimg_2 = document.querySelector("#img-pic-2");

const indexVideoname_2 = document.querySelector("#img-name-2");

const indexVideoimg_3 = document.querySelector("#img-pic-3");

const indexVideoname_3 = document.querySelector("#img-name-3");

const indexVideoimg_4 = document.querySelector("#img-pic-4");

const indexVideoname_4 = document.querySelector("#img-name-4");

const indexVideoimg_5 = document.querySelector("#img-pic-5");

const indexVideoname_5 = document.querySelector("#img-name-5");

const indexLeftBtn = document.querySelector("#video-left-btn");

const indexRightBtn = document.querySelector("#video-right-btn");

const videoPic = document.querySelector(".video-pic");

var vid;

var indexPosterPage = 1;

var urlQuery = url + "/video/query?id=" + vid;

var urlQueryEpisode = url + "/video/queryEpisode?id=" + vid;

mute_btn.addEventListener("click", muteIndexVideo);
indexVideo.addEventListener("click", openVideo);
videoBtn.addEventListener("click", openVideo);
indexLeftBtn.addEventListener("click", function () { indexPoster(-1) });
indexRightBtn.addEventListener("click", function () { indexPoster(1) });

var isMute = true;

function muteIndexVideo() {
    if (isMute == true) {   //取消静音
        notmuted.style.display = "inline-block";
        muted.style.display = "none";
        indexVideo.muted = false;
        indexVideo.volume = 0.1;
        isMute = false;
    }
    else {
        notmuted.style.display = "none";
        muted.style.display = "inline-block";
        indexVideo.muted = true;
        isMute = true;
    }
}

async function indexPoster(x) {
    var total; // total= total/size; 
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var changeData;
    var urlChange = url + "/video/search?type=&name=&size=5&page=" + indexPosterPage;
    if (x == null) {   //x == null 更换图片优先于 indexPosterPage +=x 
        await fetch(urlChange, requestOptions)
            .then(response => {
                if (response.ok) {
                    changeData = response.json();
                }
                else {
                    console("Something error in change");
                }
            })
        changeData.then(result => {
            total = (result.data.total / result.data.size);          //获取 total/size 页 size=5 的indexPoster
            total = total | 0;
            // console.log("x", x);
            // console.log("total",total); 
            indexVideoimg_1.setAttribute('src', result.data.records[0].cover);
            indexVideoname_1.innerHTML = result.data.records[0].name;
            indexVideoimg_2.setAttribute('src', result.data.records[1].cover);
            indexVideoname_2.innerHTML = result.data.records[1].name;
            indexVideoimg_3.setAttribute('src', result.data.records[2].cover);
            indexVideoname_3.innerHTML = result.data.records[2].name;
            indexVideoimg_4.setAttribute('src', result.data.records[3].cover);
            indexVideoname_4.innerHTML = result.data.records[3].name;
            indexVideoimg_5.setAttribute('src', result.data.records[4].cover);
            indexVideoname_5.innerHTML = result.data.records[4].name;
            if (indexPosterPage == 1) {
                indexLeftBtn.style.display = "none";
                indexRightBtn.style.display = "inline-block";
                videoPic.style.marginLeft = "35" + "px";
            }
        })
    }
    else {
        await fetch(urlChange, requestOptions)
            .then(response => {
                if (response.ok) {
                    changeData = response.json();
                }
                else {
                    console("Something error in change");
                }
            })
        changeData.then(result => {
            total = (result.data.total / result.data.size);          //获取 total/size 页 size=5 的indexPoster
            total = total | 0;
            // console.log("x", x);
            // console.log("total",total); 

            if (indexPosterPage == 1) {
                indexLeftBtn.style.display = "none";
                indexRightBtn.style.display = "inline-block";
                videoPic.style.marginLeft = "35" + "px";
            }
            else if (indexPosterPage == total) {
                indexLeftBtn.style.display = "inline-block";
                indexRightBtn.style.display = "none";
                videoPic.style.marginLeft = "0" + "px";
            }
            else {
                indexLeftBtn.style.display = "inline-block";
                indexRightBtn.style.display = "inline-block";
                videoPic.style.marginLeft = "0" + "px";
            }
            if (indexPosterPage + x <= total && indexPosterPage + x >= 1) indexPosterPage += x;
            if (indexPosterPage == 1) {
                indexLeftBtn.style.display = "none";
                indexRightBtn.style.display = "inline-block";
                videoPic.style.marginLeft = "35" + "px";
            }
            else if (indexPosterPage == total) {
                indexLeftBtn.style.display = "inline-block";
                indexRightBtn.style.display = "none";
                videoPic.style.marginLeft = "0" + "px";
            }
            else {
                indexLeftBtn.style.display = "inline-block";
                indexRightBtn.style.display = "inline-block";
                videoPic.style.marginLeft = "0" + "px";
            }
        })
            .then(async function () {       //获取新的indexPosterPage后再次fetch以改变poster
                urlChange = url + "/video/search?type=&name=&size=5&page=" + indexPosterPage;
                // console.log("indexPosterPage", indexPosterPage);
                // console.log("sectimeurl", urlChange);
                await fetch(urlChange, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            changeData = response.json();
                        }
                        else {
                            console("Something error in change");
                        }
                    })
                changeData.then(result => {
                    total = (result.data.total / result.data.size);          //获取 total/size 页 size=5 的indexPoster
                    total = total | 0;
                    // console.log("x", x);
                    // console.log("total",total); 

                    if (indexPosterPage == 1) {
                        indexLeftBtn.style.display = "none";
                        indexRightBtn.style.display = "inline-block";
                        videoPic.style.marginLeft = "35" + "px";
                    }
                    else if (indexPosterPage == total) {
                        indexLeftBtn.style.display = "inline-block";
                        indexRightBtn.style.display = "none";
                        videoPic.style.marginLeft = "0" + "px";
                    }
                    else {
                        indexLeftBtn.style.display = "inline-block";
                        indexRightBtn.style.display = "inline-block";
                        videoPic.style.marginLeft = "0" + "px";
                    }
                    indexVideoimg_1.setAttribute('src', result.data.records[0].cover);
                    indexVideoname_1.innerHTML = result.data.records[0].name;
                    indexVideoimg_2.setAttribute('src', result.data.records[1].cover);
                    indexVideoname_2.innerHTML = result.data.records[1].name;
                    indexVideoimg_3.setAttribute('src', result.data.records[2].cover);
                    indexVideoname_3.innerHTML = result.data.records[2].name;
                    indexVideoimg_4.setAttribute('src', result.data.records[3].cover);
                    indexVideoname_4.innerHTML = result.data.records[3].name;
                    indexVideoimg_5.setAttribute('src', result.data.records[4].cover);
                    indexVideoname_5.innerHTML = result.data.records[4].name;
                })
            })         
    }
}
indexPoster();

async function getIndexVideo() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var changeData;
    var urlChange = url + "/video/random?size=1";
    await fetch(urlChange, requestOptions)
        .then(response => {
            if (response.ok) {
                changeData = response.json();
            }
            else {
                console("Something error in change");
            }
        })
    changeData.then(result => {
        vid = result.data[0].id;            //随机获取一个视频的id
        urlQueryEpisode = url + "/video/queryEpisode?id=" + vid;
        indexVideobrief.innerHTML = result.data[0].brief;
        indexVideotag.innerHTML = result.data[0].tag;
        indexVideoname.innerHTML = result.data[0].name;
    })
        .then(async function () {
            
            await fetch(urlQueryEpisode, requestOptions)
                .then(response => {
                    if (response.ok) {
                        changeData = response.json();
                    }
                    else {
                        console("Something error in change");
                    }
                })
            changeData.then(result => {
                indexVideo.setAttribute('src', result.data[0].url);
               
            })
        })
}
getIndexVideo();

function openVideo() {
    console.log("yes");
}