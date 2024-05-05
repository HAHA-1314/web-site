var addBtn = document.querySelector('#addfavorite');

var addedFavorite = document.querySelector('.addedFavorite');

addBtn.addEventListener('click', addFavorite);

var outFavorite;
var runFavorite;
var pos;
var waitResponse;   //一组计时器

async function addFavorite() {
    pos = 1;
    clearTimeout(outFavorite);
    clearInterval(runFavorite);
    clearTimeout(waitResponse);
    // 重置计时器
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    var urlFavorite = url + "/video/star?id=" + videoid;
    await fetch(urlFavorite, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  addFavorite()");
            }
        })
    Data.then(result => {
        if (result.data == '取消收藏') {
            addBtn.setAttribute('src', 'icon/column.png');
            favoriteList.delete(Number(oid));
        }
        else if (result.data == '收藏成功') {
            addBtn.setAttribute('src', 'icon/favorite-selected.png');
            favoriteList.set(Number(oid),1);
        }
        addedFavorite.innerHTML = result.data;
        FavoriteFunction();
    })
}

function ifaddedFavorite() {
    if (favoriteList.get(Number(videoid)) == 1) addBtn.setAttribute('src','icon/favorite-selected.png'); 
    else addBtn.setAttribute('src','icon/column.png');
}

function FavoriteFunction() {
    addedFavorite.style.display = 'inline-block';
    addedFavorite.style.opacity = 0;
    waitResponse = setTimeout(() => {
        runFavorite = setInterval(() => {
            if (pos == 100) {
                clearInterval(runFavorite);
            }
            else {
                pos++;
                addedFavorite.style.opacity = pos / 100;
            }
        }, 1)
        outFavorite = setTimeout(() => {
            runFavorite = setInterval(() => {
                if (pos == 0) {
                    clearInterval(runFavorite);
                    addedFavorite.style.display = 'none';
                }
                else {
                    pos--;
                    addedFavorite.style.opacity = pos / 100;
                }
            }, 1)
        }, 800)    //outFavorite 使收藏提示在窗口滞留
    }, 300) //waitResponse 防止用户快速点击造成动画bug
}