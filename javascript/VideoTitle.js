var window_title = document.querySelector('.window-title');

var intro_name = document.querySelector("#intro-close");

function changeTitle() {
    if (videotype == "电视剧") {
        console.log(videoname);
        window_title.innerHTML = videoname + "第01集_电视剧_高清完整版视频在线观看_爱奇艺";
    }
    else if (videotype == "电影") {
        window_title.innerHTML = videoname + "_电影_高清完整版视频在线观看_爱奇艺";
    }
}