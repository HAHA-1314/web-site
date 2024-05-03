var favoriteTotal;

var favoriteList = new Map();

async function FavoriteList() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlFavoriteList = url + "/info/collect?page=1&pageSize=1";
    await fetch(urlFavoriteList, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  FavoriteList()");
            }
        })
    Data.then(result => {
        favoriteTotal = result.data.total;
        getFavoriteIdList();
    })
}
FavoriteList(); //首先执行一次检测用户收藏总数

function deleteFavorite(delete_num) {
    if (delete_num == 0) {
        for (let x = 0; x < favoriteTotal; x++) {

        }
    }
}

async function getFavoriteIdList() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlFavoriteList = url + "/info/collect?page=1&pageSize=" + favoriteTotal;
    await fetch(urlFavoriteList, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  FavoriteList()");
            }
        })
    Data.then(result => {
        for (let x = 0; x < favoriteTotal; x++) {
            favoriteList.set(result.data.records[x].episodeId, 1);
        }
        console.log(favoriteList);
    })
        .then(() => {
            ifaddedFavorite();
        })
}

async function deleteFavorite(oid) {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlFavorite = url + "/video/star?id=" + oid;
    await fetch(urlFavorite, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  deletedFavorite()");
            }
        })
}