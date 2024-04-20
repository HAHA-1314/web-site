var window_title = document.querySelector('.window-title');

var intro_name = document.querySelector("#intro-close");

var video_type;

function changeTitle() {
    var name;
    if (video_type == "电视剧") {
        window_title.innerHTML = name + "第01集_电视剧_高清完整版视频在线观看_爱奇艺";
    }
}
changeTitle();