var vid;

const index_video = document.querySelector('#index-video');

index_video.addEventListener("click", toVideosite);

var urlChange = url + "/video/random?size=1";

var urlQuery = url + "/video/query?id=" + vid;

async function randomVideo() {
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
        vid = result.data[0].id;            //随机获取一个视频的id
    })

    await fetch(urlQuery, requestOptions)
        .then(response => {
            if (response.ok) {
                changeData = response.json();
            }
            else {
                console("Something error in change");
            }
        })
    changeData.then(result => {
        // index_video.setAttribute('src',result.)
    })
}
randomVideo();

function toVideosite() {
    console.log("yes");
}