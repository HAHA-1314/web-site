var movie_tab = document.querySelector('#content-movie');

var all_tab = document.querySelector('#content-all');

var video_tab = document.querySelector('#content-video');

const change_button = document.querySelector('.change-content');

const pic_1_1 = document.querySelector('#pic-1-1');

const name_1_1 = document.querySelector('#name-1-1');

const description_1_1 = document.querySelector('#description-1-1');

const pic_1_2 = document.querySelector('#pic-1-2');

const name_1_2 = document.querySelector('#name-1-2');

const description_1_2 = document.querySelector('#description-1-2');

const pic_1_3 = document.querySelector('#pic-1-3');

const name_1_3 = document.querySelector('#name-1-3');

const description_1_3 = document.querySelector('#description-1-3');

const pic_1_4 = document.querySelector('#pic-1-4');

const name_1_4 = document.querySelector('#name-1-4');

const description_1_4 = document.querySelector('#description-1-4');

const pic_1_5 = document.querySelector('#pic-1-5');

const name_1_5 = document.querySelector('#name-1-5');

const description_1_5 = document.querySelector('#description-1-5');

const pic_1_6 = document.querySelector('#pic-1-6');

const name_1_6 = document.querySelector('#name-1-6');

const description_1_6 = document.querySelector('#description-1-6');

const pic_2_1 = document.querySelector('#pic-2-1');

const name_2_1 = document.querySelector('#name-2-1');

const description_2_1 = document.querySelector('#description-2-1');

const pic_2_2 = document.querySelector('#pic-2-2');

const name_2_2 = document.querySelector('#name-2-2');

const description_2_2 = document.querySelector('#description-2-2');

const pic_2_3 = document.querySelector('#pic-2-3');

const name_2_3 = document.querySelector('#name-2-3');

const description_2_3 = document.querySelector('#description-2-3');

const pic_2_4 = document.querySelector('#pic-2-4');

const name_2_4 = document.querySelector('#name-2-4');

const description_2_4 = document.querySelector('#description-2-4');

const pic_2_5 = document.querySelector('#pic-2-5');

const name_2_5 = document.querySelector('#name-2-5');

const description_2_5 = document.querySelector('#description-2-5');

const pic_2_6 = document.querySelector('#pic-2-6');

const name_2_6 = document.querySelector('#name-2-6');

const description_2_6 = document.querySelector('#description-2-6');

var page = 1;

const total = 2; //目前接口支持的最大page

var type = "all";

var urlMovie = url + "/video/search?type=电影&name=&size=6&page=" + page;

var urlChange = url + "/video/random?size=6";

var urlVideo = url + "/video/search?type=电视剧&name=&size=6&page=" + page;

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

async function videoChange() {
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
                console("Something error in Moviechange");
            }
        })
    changeData.then(result => {
        // console.log(result);
        // console.log(result.data.name);
        // console.log(result.data.records.name);   
        pic_1_1.setAttribute('src', result.data.records[0].cover);
        name_1_1.innerHTML = result.data.records[0].name;
        description_1_1.innerHTML = result.data.records[0].brief;
        pic_1_2.setAttribute('src', result.data.records[1].cover);
        name_1_2.innerHTML = result.data.records[1].name;
        description_1_2.innerHTML = result.data.records[1].brief;
        pic_1_3.setAttribute('src', result.data.records[2].cover);
        name_1_3.innerHTML = result.data.records[2].name;
        description_1_3.innerHTML = result.data.records[2].brief;
        pic_1_4.setAttribute('src', result.data.records[3].cover);
        name_1_4.innerHTML = result.data.records[3].name;
        description_1_4.innerHTML = result.data.records[3].brief;
        pic_1_5.setAttribute('src', result.data.records[4].cover);
        name_1_5.innerHTML = result.data.records[4].name;
        description_1_5.innerHTML = result.data.records[4].brief;
        pic_1_6.setAttribute('src', result.data.records[5].cover);
        name_1_6.innerHTML = result.data.records[5].name;
        description_1_6.innerHTML = result.data.records[5].brief;
    })
    console.log(page);
    if (page == total) page = 1;
    else page++;
}

async function movieChange() {
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
        pic_1_1.setAttribute('src', result.data.records[0].cover);
        name_1_1.innerHTML = result.data.records[0].name;
        description_1_1.innerHTML = result.data.records[0].brief;
        pic_1_2.setAttribute('src', result.data.records[1].cover);
        name_1_2.innerHTML = result.data.records[1].name;
        description_1_2.innerHTML = result.data.records[1].brief;
        pic_1_3.setAttribute('src', result.data.records[2].cover);
        name_1_3.innerHTML = result.data.records[2].name;
        description_1_3.innerHTML = result.data.records[2].brief;
        pic_1_4.setAttribute('src', result.data.records[3].cover);
        name_1_4.innerHTML = result.data.records[3].name;
        description_1_4.innerHTML = result.data.records[3].brief;
        pic_1_5.setAttribute('src', result.data.records[4].cover);
        name_1_5.innerHTML = result.data.records[4].name;
        description_1_5.innerHTML = result.data.records[4].brief;
        pic_1_6.setAttribute('src', result.data.records[5].cover);
        name_1_6.innerHTML = result.data.records[5].name;
        description_1_6.innerHTML = result.data.records[5].brief;
    })
    if (page == total) page = 1;
    else page++;
}


change_button.onclick = async function randomChange() {
    if (type != "all") return;
    else if (type == "movie") movieChange();
    else if (type == "video") videoChange();
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
        // console.log(result.data.name);
        // console.log(result.data.records.name);   
        pic_1_1.setAttribute('src', result.data[0].cover);
        name_1_1.innerHTML = result.data[0].name;
        description_1_1.innerHTML = result.data[0].brief;
        pic_1_2.setAttribute('src', result.data[1].cover);
        name_1_2.innerHTML = result.data[1].name;
        description_1_2.innerHTML = result.data[1].brief;
        pic_1_3.setAttribute('src', result.data[2].cover);
        name_1_3.innerHTML = result.data[2].name;
        description_1_3.innerHTML = result.data[2].brief;
        pic_1_4.setAttribute('src', result.data[3].cover);
        name_1_4.innerHTML = result.data[3].name;
        description_1_4.innerHTML = result.data[3].brief;
        pic_1_5.setAttribute('src', result.data[4].cover);
        name_1_5.innerHTML = result.data[4].name;
        description_1_5.innerHTML = result.data[4].brief;
        pic_1_6.setAttribute('src', result.data[5].cover);
        name_1_6.innerHTML = result.data[5].name;
        description_1_6.innerHTML = result.data[5].brief;
    })
}
// change_button.click(); //首先执行一次
