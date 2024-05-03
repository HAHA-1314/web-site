var videotype;
var videoname;
var videotag;
var videobrief;
var videocover;
var videoreleasePlace;
var videoreleaseTime;
var videoIntroduction;
var videoHotpot;
var videocount;
var videodaily;
var videoUid = 1;
var videoNewUid;

var urlGetIntro = url + "/video/query?id="

var searchId = new URLSearchParams(window.location.search);

var videoid = searchId.get("id");

var headtext = document.querySelector('#head-text');

var introname = document.querySelector(".intro-name");

var intropic = document.querySelector('.photo');

var secintro = document.querySelector('.sec-intro-text');

var thiintro = document.querySelector('.thi-intro-text');

var forintro = document.querySelector('.for-intro-text');

var fifintro = document.querySelector('.fif-intro-text');

var introinfo = document.querySelector('#intro-info');

var introcount = document.querySelector('.intro-count');

var countList = document.querySelector('.count-list');

var introintroduce = document.querySelector('#introduce');

var videoNow = document.querySelector('.video');

var episodeName = new Array(); //电影选集

var chosenRow;

var chosenText;

var countButton;

var countText;

async function getVideoIntro() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    urlGetIntro = url + "/video/query?id=" + videoid;
    await fetch(urlGetIntro, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  getVideoIntro()");
            }
        })
    Data.then(result => {
        videoname = result.data.name;
        videotype = result.data.type;
        videotag = result.data.tag;
        videoreleasePlace = result.data.releasePlace;
        videoreleaseTime = result.data.releaseTime.slice(0, 4);
        videoIntroduction = result.data.introduction;
        videoHotpot = result.data.hotpot;
        videocount = result.data.allCount;
        videodaily = result.data.daily;
        videobrief = result.data.brief; //以上返回信息，字符串形式
        videocover = result.data.cover; //返回URL
    })
        .then(() => {
            changeTitle();
            changeIntro();    
            if (videotype == '电影') {
                getEpisode();
            }
            else {
                changeCount();
                onchoose();
                changeVideo();
            }
        })
}
getVideoIntro();

function changeIntro() {
    if (videotype == "电视剧") {
        headtext.innerHTML = videoname;
        if (videoname.length >= 10) headtext.style.fontSize = 20 + 'px';
        intropic.setAttribute('src', videocover);
        secintro.innerHTML = videoHotpot + ' · ' + videoreleasePlace + ' · ' + videoreleaseTime;
        thiintro.innerHTML = videotag;
        forintro.innerHTML = "全" + videocount + "集";
        fifintro.innerHTML = videodaily;
        introinfo.innerHTML = videoHotpot + ' · ' + videoreleaseTime + ' · ' + videotag + ' · ' + videoreleasePlace;
        introcount.innerHTML = "全" + videocount + "集";
        introintroduce.innerHTML = videoIntroduction;
        introname.textContent = videoname;
    }
    else {
        headtext.innerHTML = videoname;
        if (videoname.length >= 10) headtext.style.fontSize = 20 + 'px';
        intropic.setAttribute('src', videocover);
        secintro.innerHTML = videoHotpot + ' · ' + videoreleasePlace + ' · ' + videoreleaseTime;
        thiintro.innerHTML = videotag;
        introinfo.innerHTML = videoHotpot + ' · ' + videoreleaseTime + ' · ' + videotag + ' · ' + videoreleasePlace;
        introintroduce.innerHTML = videoIntroduction;
        introname.innerHTML = videoname;
    }

}

async function getEpisode() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    urlGetIntro = url + "/video/queryEpisode?id=" + videoid;
    await fetch(urlGetIntro, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                console("Something error in  getVideoIntro()");
            }
        })
    Data.then(result => {
        for (let x = 0; x < result.data.length; x++) {
            episodeName[x] = result.data[x].name;
        }
        videocount = result.data.length;
        changeCount();
        onchoose();
        changeVideo();
    })
}

function changeCount() {
    var vid = 1;
    var videoColumn = ((videocount / 6) | 0) + 1;
    if (videotype == "电影") {
        for (let i = 0; i < videoColumn; i++) {
            var chooseList = document.createElement('div');
            chooseList.setAttribute('class', 'choose-list');
            countList.appendChild(chooseList);
            for (let j = 0; j < ((i == videoColumn - 1) ? (videocount % 6) : 6); j++) {
                var listRow = document.createElement('div');
                var listNum = document.createElement('span');
                listRow.setAttribute('class', 'list-row')
                if (j == 0) {
                    listRow.style.marginLeft = 20 + 'px';
                };
                listNum.setAttribute('class', 'list-num');
                listNum.innerHTML = episodeName[vid - 1];
                chooseList.appendChild(listRow);
                listRow.appendChild(listNum);
                vid++;
            }
        }
        countButton = document.querySelectorAll('.list-row');
        countText = document.querySelectorAll('.list-num');
        console.log(countButton);
        console.log(countText);
    }
    else { //电视剧选集
        for (let i = 0; i < videoColumn; i++) {
            var chooseList = document.createElement('div');
            chooseList.setAttribute('class', 'choose-list');
            countList.appendChild(chooseList);
            for (let j = 0; j < ((i == videoColumn - 1) ? (videocount % 6) : 6); j++) {
                var listRow = document.createElement('div');
                var listNum = document.createElement('span');
                listRow.setAttribute('class', 'list-row')
                if (j == 0) {
                    listRow.style.marginLeft = 20 + 'px';
                };
                listNum.setAttribute('class', 'list-num');
                listNum.innerHTML = vid;
                chooseList.appendChild(listRow);
                listRow.appendChild(listNum);
                vid++;
            }
        }
        countButton = document.querySelectorAll('.list-row');
        countText = document.querySelectorAll('.list-num');
    }
}

async function changeVideo() {
    var urlCount = url + '/video/queryEpisode' + "?id=" + videoid;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    await fetch(urlCount, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                console("Something error in  videoCount()");
            }
        })
    Data.then(result => {
        if (videoNewUid != null) {
            videoNow.setAttribute('src', result.data[videoNewUid - 1].url);
        }
        else {
            videoNow.setAttribute('src', result.data[videoUid - 1].url);
        }
    })
        .then(() => {
            if (videoNewUid != null) {
                countButton[videoUid - 1].setAttribute('id', '');
                countText[videoUid - 1].setAttribute('id', '');
                // countButton[videoUid - 1].style.background = "rgb(88, 88, 88)";
                // countText[videoUid - 1].style.color = "#b3b6b0";
                countButton[videoNewUid - 1].setAttribute('id', 'onchoose-back');
                countText[videoNewUid - 1].setAttribute('id', 'onchoose-text');
                // countButton[videoNewUid - 1].style.background = "rgb(56, 102, 103)";
                // countText[videoNewUid - 1].style.color = "rgb(81, 177, 179)";
                videoUid = videoNewUid;
            }
            else {
                countButton[videoUid - 1].setAttribute('id', 'onchoose-back');
                countText[videoUid - 1].setAttribute('id', 'onchoose-text');
                // countButton[videoUid - 1].style.background = "rgb(56, 102, 103)";
                // countText[videoUid - 1].style.color = "rgb(81, 177, 179)";
            }

        })
}

function onchoose() {
    console.log('videocount', videocount);
    for (let x = 0; x < videocount; x++) {
        countButton[x].onclick = function () {
            videoNewUid = x + 1;
            changeVideo();
        }
    }
}