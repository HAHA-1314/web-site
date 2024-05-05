var subText = document.querySelectorAll('.sub-text');

var subimg = document.querySelectorAll('#subscribe-img');

var addedFavorite = document.querySelector('.addedFavorite');

// console.log(popularArray);
// console.log(subBtn);

var outFavorite;
var runFavorite;
var pos;
var waitResponse;   //一组计时器

async function addFavorite(oid, x) {
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
    var urlFavorite = url + "/video/star?id=" + oid;
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
            subText[x].style.left = 10 + 'px';
            subText[x].innerHTML = '追';
            subimg[x].setAttribute('src', 'icon/column.png');
            favoriteList.delete(Number(oid));
        }
        else if (result.data == '收藏成功') {
            subText[x].style.left = 3 + 'px';
            subText[x].innerHTML = '加追';
            subimg[x].setAttribute('src', 'icon/favorite-selected-noColor.png');
            favoriteList.set(Number(oid), 1);
        }
        addedFavorite.innerHTML = result.data;
        FavoriteFunction();
    })
}

function ifaddedFavorite(oid, x) {
    // subText = document.querySelectorAll('.sub-text');
    if (favoriteList.get(Number(oid)) == 1) {
        subText[x].style.left = 3 + "px";
        subText[x].innerHTML = '加追';
        subimg[x].setAttribute('src', 'icon/favorite-selected-noColor.png');
    }
    else {
        subText[x].style.left = 10 + "px";
        subText[x].innerHTML = '追';
        subimg[x].setAttribute('src', 'icon/column.png');
    }
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
        }, 500)    //outFavorite 使收藏提示在窗口滞留
    }, 100) //waitResponse 防止用户快速点击造成动画bug
}