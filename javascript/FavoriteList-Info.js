var favoritefather = document.querySelector('.favorList');

var favorDeleteallBtn = document.querySelector('.delete-allfavor');

var nonfavorite = document.querySelector('.nothingfavor');

var favor_row = document.querySelector('.favor-row');

var deletebtn;

favorDeleteallBtn.addEventListener('click', deleteFavorite);

function ifaddedFavorite() {
    if (favoriteList.size != 0) {
        nonfavorite.style.display = 'none';
        favor_row.style.display = 'inline-block';
        appendFavorite();   //展示所有的收藏
    }
    else {
        return;
    }
}//监听用户收藏记录是否为空并展示所有的收藏

async function appendFavorite() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlAppend;
    for (let x = 0; x < favoriteArray.length; x++) {
        urlAppend = url + '/video/query?id=' + favoriteArray[x][0];
        await fetch(urlAppend, requestOptions)
            .then(response => {
                if (response.ok) {
                    Data = response.json();
                }
                else {
                    alert("Something error in  appendFavorite()");
                }
            })
        Data.then(result => {
            var favorcolumn = document.createElement('div');
            var poster_resource = document.createElement('div');
            var favor_poster = document.createElement('img');
            var favor_play = document.createElement('img');
            var favor_delete = document.createElement('div');
            var delete_icon = document.createElement('img');
            var poster_name = document.createElement('div');
            var poster_progress = document.createElement('div');
            favorcolumn.setAttribute('class', 'favor-column');
            poster_resource.setAttribute('class', 'poster-resource');
            favor_poster.setAttribute('class', 'favor-poster');
            favor_play.setAttribute('class', 'favor-play');
            favor_delete.setAttribute('class', 'favor-delete');
            delete_icon.setAttribute('class', 'favor-delete-icon');
            poster_name.setAttribute('class', 'poster-name');
            poster_progress.setAttribute('class', 'poster-progress');
            poster_name.innerHTML = result.data.name;
            poster_progress.innerHTML = "观看至";
            favor_poster.setAttribute('src', result.data.cover);
            favor_play.setAttribute('src', 'icon/start-icon-info.png');
            delete_icon.setAttribute('src', 'icon/delete.png');
            favoritefather.appendChild(favorcolumn);
            favorcolumn.appendChild(poster_resource);
            poster_resource.appendChild(favor_poster);
            poster_resource.appendChild(favor_play);
            poster_resource.appendChild(favor_delete);
            favor_delete.appendChild(delete_icon);
            favorcolumn.appendChild(poster_name);
            favorcolumn.appendChild(poster_progress);
        })
            .then(() => {
                deletebtn = document.querySelectorAll('.favor-delete-icon');
                favor_play = document.querySelectorAll('.favor-play');
                poster_name = document.querySelectorAll('.poster-name');
                clickThisFavor();
            })
    }
}

function clickThisFavor() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlDelete;
    for (let x = 0; x < favoriteArray.length; x++) {
        deletebtn[x].onclick = async function () {
            urlDelete = url + '/video/star?id=' + favoriteArray[x][0];
            await fetch(urlDelete, requestOptions)
                .then(response => {
                    if (response.ok) {
                        Data = response.json();
                    }
                    else {
                        alert("Something error in  appendFavorite()");
                    }
                })
            Data.then(result => {
                if (result.data == "取消收藏") {
                    favoriteList.delete(favoriteArray[x][0]);
                    favoriteArray = Array.from(favoriteList);
                    alert('删除成功');
                    location.reload();
                    ifaddedFavorite();
                }
            })
        }
        favor_play[x].onclick = function () {
            window.open(`remake-videosite.html?id=${favoriteArray[x][0]}`);
        }
        poster_name[x].onclick = function () {
            window.open(`remake-videosite.html?id=${favoriteArray[x][0]}`);
        }
    }
}

async function deleteFavorite() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    for (let x = 0; x < favoriteTotal; x++) {
        var urlDeleteAll = url + "/video/star?id=" + favoriteArray[x][0];
        await fetch(urlDeleteAll, requestOptions)
            .then(response => {
                if (response.ok) {
                    Data = response.json();
                }
                else {
                    alert("Something error in  deleteFavorite()");
                }
            })
    }
    alert('列表所有已删除!');
    favoriteList.clear();
    favoriteArray = Array.from(favoriteList);
    location.reload();
}