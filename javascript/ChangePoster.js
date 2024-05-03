var movie_tab = document.querySelector('#content-movie');

var all_tab = document.querySelector('#content-all');

var video_tab = document.querySelector('#content-video');

const change_button = document.querySelector('.change-content');

const popular = document.querySelectorAll('.popular')

const popular_video = document.querySelectorAll('.popular-video');

const popular_poster = document.querySelectorAll('.popular-poster');

const popular_name = document.querySelectorAll('.poster-name');

const popular_description = document.querySelectorAll('.poster-description');

const popular_muteBtn = document.querySelectorAll('.popular-mutebtn');

const popular_videobox = document.querySelectorAll('.popular-videobox');

const videomuted = document.querySelectorAll('#popualr-video-muted');

const videonotmuted = document.querySelectorAll('#popular-video-notmuted');

const videoprogress = document.querySelectorAll('.videobar-progress');

// console.log(popular);

var page = 1;

var type = "all";

var urlMovie = url + "/video/search?type=电影&name=&size=6&page=" + page;

var urlChange = url + "/video/random?size=12";

var urlVideo = url + "/video/search?type=电视剧&name=&size=6&page=" + page;

var popularList = new Array();

var popularVideo; //计时器
var videoBar; //计时器

// var pvideoList = new Array();

movie_tab.addEventListener("click", movieTab);
all_tab.addEventListener("click", allTab);
video_tab.addEventListener("click", videoTab);

function movieTab() {
    if (type == "all") {
        page = 1; //重置page
        movie_tab.style.color = "white";
        movie_tab.style.cursor = "default";
        all_tab.style.color = "rgb(255,255,255,0.4)";
        all_tab.style.cursor = "pointer";
        type = "movie";
        movieChange();
    }
    else if (type == "video") {
        page = 1; //重置page
        movie_tab.style.color = 'white';
        movie_tab.style.cursor = 'default';
        video_tab.style.color = "rgb(255,255,255,0.4)";
        video_tab.style.cursor = "pointer";
        type = "movie";
        movieChange();
    }
}

function allTab() {
    if (type == "movie") {
        all_tab.style.color = "white";
        all_tab.style.cursor = "default";
        movie_tab.style.cursor = 'pointer';
        movie_tab.style.color = 'rgb(255,255,255,0.4)';
        type = 'all';
        change_button.click();
    }
    else if (type == "video") {
        all_tab.style.color = 'white';
        all_tab.style.cursor = 'default';
        video_tab.style.color = "rgb(255,255,255,0.4)";
        video_tab.style.cursor = "pointer";
        type = "all";
        change_button.click();
    }
}

function videoTab() {
    if (type == "all") {
        page = 1; //重置page
        video_tab.style.color = "white";
        video_tab.style.cursor = "default";
        all_tab.style.color = "rgb(255,255,255,0.4)";
        all_tab.style.cursor = "pointer";
        type = "video";
        videoChange();
    }
    else if (type == "movie") {
        page = 1; //重置page
        video_tab.style.color = 'white';
        video_tab.style.cursor = 'default';
        movie_tab.style.color = "rgb(255,255,255,0.4)";
        movie_tab.style.cursor = "pointer";
        type = "video";
        videoChange();
    }
}

async function videoChange(x) {
    var total;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var changeData;
    await fetch(urlVideo, requestOptions)
        .then(response => {
            if (response.ok) {
                changeData = response.json();
            }
            else {
                console("Something error in VideoChange");
            }
        })
    changeData.then(result => {
        total = (result.data.total / result.data.size);          //获取 total/size 页 size=5 的indexPoster
        total = total | 0;
        if (x != null) {
            if (page == total) {
                page = 1;
                alert("没有更多了");
            }
            else page++;
        }
        else page = 1;


    })
        .then(async function () {
            urlVideo = url + "/video/search?type=电视剧&name=&size=12&page=" + (page);
            await fetch(urlVideo, requestOptions)
                .then(response => {
                    if (response.ok) {
                        changeData = response.json();
                    }
                    else {
                        console("Something error in secVideoChange");
                    }
                })
            changeData.then(result => {
                for (let x = 0; x < 12; x++) {
                    popular_poster[x].setAttribute("src", result.data.records[x].cover);
                    popular_name[x].innerHTML = result.data.records[x].name;
                    popular_description[x].innerHTML = result.data.records[x].brief;
                    popularList[x] = result.data.records[x].id;
                }
                changePopularVideo();
            })
        })
}

async function movieChange(x) {
    var total;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var changeData;
    await fetch(urlMovie, requestOptions)
        .then(response => {
            if (response.ok) {
                changeData = response.json();
            }
            else {
                console("Something error in Moviechange");
            }
        })
    changeData.then(result => {
        // console.log(result);
        // console.log(result.data.name);
        // console.log(result.data.records.name);   
        total = (result.data.total / result.data.size);          //获取 total/size 页 size=5 的indexPoster
        total = total | 0;
        if (x != null) {
            if (page == total) page = 1;
            else page++;
        }
        else page = 1;
        urlMovie = url + "/video/search?type=电影&name=&size=6&page=" + page;
    })
        .then(async function () {
            await fetch(urlMovie, requestOptions)
                .then(response => {
                    if (response.ok) {
                        changeData = response.json();
                    }
                    else {
                        console("Something error in secMoviechange");
                    }
                })
            changeData.then(result => {
                for (let x = 0; x < 6; x++) {
                    popular_poster[x].setAttribute("src", result.data.records[x].cover);
                    popular_name[x].innerHTML = result.data.records[x].name;
                    popular_description[x].innerHTML = result.data.records[x].brief;
                    popularList[x] = result.data.records[x].id;
                }
                changePopularVideo();
            })

        })
}


change_button.onclick = async function randomChange() {
    if (type == "movie") {
        movieChange(1);     //传参来表示用户点击了换一换
        return;
    }
    if (type == "video") {
        videoChange(1);
        return;
    }
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var changeData;
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
        // console.log(result);  
        // console.log(popular_name);
        // console.log(popular_poster);
        // console.log(popular_description);
        // console.log(result.data[1].cover);
        for (let x = 0; x < 12; x++) {
            popular_poster[x].setAttribute("src", result.data[x].cover);
            popular_name[x].innerHTML = result.data[x].name;
            popular_description[x].innerHTML = result.data[x].brief;
            popularList[x] = result.data[x].id;
        }
        changePopularVideo();   //获得所有的id再执行更换视频
    })
}
change_button.click(); //首先执行一次

async function changePopularVideo() {
    // console.log(popularList.length);
    for (let x = 0; x < popularList.length; x++) {
        var urlVideoChange = url + '/video/queryEpisode?id=' + popularList[x];
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            'Content-Type': "application/json",
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            mode: "cors",
        };
        var changeData;
        await fetch(urlVideoChange, requestOptions)
            .then(response => {
                if (response.ok) {
                    changeData = response.json();
                }
                else {
                    alert("Something error in change");
                }
            })
        changeData.then(result => {
            popular_video[x].setAttribute('src', result.data[0].url);
        })
    }
    mouseonPoster();
}

function mouseonPoster() {
    var isMuted = 0;
    // console.log(popular_video);
    for (let x = 0; x < popularList.length; x++) {
        ifaddedFavorite(popularList[x], x);
        popular_video[x].muted = 1;
        videonotmuted[x].style.display = 'none';
        popular[x].onmouseenter = function () {
            videoBar = setInterval(() => {
                // console.log('Time', popular_video[x].currentTime);
                // console.log('duration', popular_video[x].duration);
                videoprogress[x].style.width = 100*(popular_video[x].currentTime / popular_video[x].duration) + '%';
            },50)
            popularVideo = setTimeout(() => {
                popular_poster[x].style.display = "none";
                popular_video[x].style.display = "inline-block";
                popular_video[x].play();
                popular_video[x].volume = 0.3;
                popular_video[x].loop = 1;
                popular_videobox[x].style.display = "inline-block";
                popular_muteBtn[x].onclick = function () {
                    if (isMuted == 0) {
                        popular_video[x].muted = 0;
                        videomuted[x].style.display = 'none';
                        videonotmuted[x].style.display = 'inline-block';
                        isMuted = 1;
                    }
                    else {
                        popular_video[x].muted = 1;
                        videomuted[x].style.display = 'inline-block';
                        videonotmuted[x].style.display = 'none';
                        isMuted = 0;
                    }
                }
            }, 300)
        }
        popular[x].onmouseleave = function () {
            clearTimeout(popularVideo);
            clearInterval(videoBar);
            popular_poster[x].style.display = "inline-block";
            popular_video[x].style.display = 'none';
            popular_videobox[x].style.display = 'none';
            popular_video[x].pause();
        }
        popular_video[x].onclick = function () {
            window.open(`remake-videosite.html?id=${popularList[x]}`);
        }
    }
}
