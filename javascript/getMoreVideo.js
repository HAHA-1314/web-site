var adder_box = document.querySelector('#adder-box'); //新的一行高度290px，初始高度 230px

var loading_box = document.querySelector('.loading-box');

var adder_row = 0;

var column = 0;

var adder_total = localStorage.getItem('total');

var maxrow = (adder_total / 6) | 0; //满列的最大行数

var restcount = adder_total % maxrow; //最后一行的列数

var isButtom = 0;

var addPopular;

var adderSet = new Set();
var adderArray = new Array();
var addPopularArray = new Array();

var amount = 0;

//滚动长度
function getDocumentTop() {
    var scrollTop = 0;
    scrollTop = document.documentElement.scrollTop;
    // console.log("scrollTop", scrollTop);
    return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
    var windowHeight;
    windowHeight = document.documentElement.clientHeight;
    // console.log("windowheight", windowHeight);
    return windowHeight;
}

//文档高度
function getScrollHeight() {
    var scrollHeight = 0
    scrollHeight = document.documentElement.scrollHeight;
    // console.log("scrollHeight", scrollHeight);
    return scrollHeight;
}

async function loading() {
    // console.log('maxrow', maxrow);
    // console.log('total',adder_total);
    console.log("adder_row", adder_row);
    if (adder_row < maxrow) {
        adder_row++;
        amount += 6;
    }
    else if (adder_row == maxrow && restcount != 0) {
        adder_row++;
        amount += restcount;
    }
    else {
        loading_box.innerHTML = '没有更多了';
        return;
    }
    console.log("adder_row", adder_row);
    var add_row = document.createElement('div');
    adder_box.appendChild(add_row);
    add_row.setAttribute('class', 'fir-image');
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    for (let x = (adder_row - 1) * 6; x < amount; x++) {
        var urlPopular = url + "/video/query?id=" + adderArray[x];
        await fetch(urlPopular, requestOptions)
            .then(response => {
                if (response.ok) {
                    Data = response.json();
                }
                else {
                    alert("Something error in getPopular()");
                }
            })
        Data.then(result => {
            // console.log(adderArray[x], " ");
            var add_column = document.createElement("span");
            add_column.setAttribute("class", "popular");
            add_row.appendChild(add_column);
            var column_img = document.createElement('img');
            column_img.setAttribute('class', 'popular-poster');
            column_img.setAttribute('src', result.data.cover);
            add_column.appendChild(column_img);
            var column_name = document.createElement('div');
            column_name.setAttribute('class', 'poster-name');
            column_name.innerHTML = result.data.name;
            add_column.appendChild(column_name);
            var column_description = document.createElement('div');
            column_description.setAttribute('class', 'poster-description');
            column_description.innerHTML = result.data.brief;
            add_column.appendChild(column_description);
            var column_corner = document.createElement('div');
            column_corner.setAttribute('class', 'corner-vip-icon');
            column_corner.innerHTML = 'VIP';
            add_column.appendChild(column_corner);
            var column_sub = document.createElement('div');
            column_sub.setAttribute('class', 'sub-btn');
            add_column.appendChild(column_sub);
            var sub_img = document.createElement('img');
            sub_img.setAttribute('id', 'subscribe-img');
            sub_img.setAttribute('src', 'icon/column.png');
            column_sub.appendChild(sub_img);
            var sub_text = document.createElement('span');
            sub_text.setAttribute('class', 'sub-text-2');
            sub_text.innerHTML = ' ' + '追';
            column_sub.appendChild(sub_text);
            
            addPopularArray[x] = result.data.id; // result.data.id==adderArray[x]
        })
            .then(() => {
                addPopular = document.querySelectorAll('.popular');
                adder_box.style.height = 300 + (adder_row) * 290 + 'px';
                addPopularOnclick();
            })
    }


}

/*
当滚动条滑动，触发事件，判断是否到达最底部
然后调用ajax处理函数异步加载数据
*/
window.onscroll = function () {
    //监听事件内容
    if (getDocumentTop() + getWindowHeight() + 5 >= getScrollHeight()) {
        if (adderArray.length == 0) {
            loading_box.style.display = 'inline-block';
            return;
        }
        loading_box.style.display = 'inline-block';
        if (isButtom != 1) loadingTimeout = setTimeout('loading()', 1000);
        isButtom = 1;
    }
    else if (isButtom == 1 && getDocumentTop() + getWindowHeight() <= getScrollHeight()) {
        loading_box.style.display = 'none';
        isButtom = 0;
        clearTimeout(loadingTimeout);
    }
    else {
        loading_box.style.display = 'none';
    }
}

async function getRandom() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    urlRandomSet = url + "/video/random?size=4";
    await fetch(urlRandomSet, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in getVideoIntro()");
            }
        })
    Data.then(result => {
        for (let x = 0; x < 4; x++) {
            adderSet.add(result.data[x].id);
        }
        if (adderSet.size != adder_total) {
            loading_box.innerHTML = "正在请求数据！请稍后再试！";
            getRandom();
        }
        else {
            adderArray = Array.from(adderSet);
            loading_box.innerHTML = "正在加载数据......上滑取消加载";
            console.log(adderArray);
        }
    })
}
getRandom();

function addPopularOnclick() {
    if (!addPopularArray.length) return;
    for (let x = 12; x < addPopular.length; x++){
        addPopular[x].onclick = function () {
            console.log(addPopularArray[x-12]);
            window.open(`remake-videosite.html?id=${addPopularArray[x-12]}`);
        }
    }
}

