var search_zone = document.querySelector('.search-zone');

var index_input = document.querySelector("#index-input");

var hot_line = document.querySelector(".hot-line");

var history_line = document.querySelector(".history-line");

var search_history = document.querySelector(".search-history");

var search_hot = document.querySelector(".search-hot");

var hot_zone = document.querySelector('.hot-zone');

var hot_list = document.querySelector('.hot-list');

var search_line = document.querySelector(".search-line");

var close_hotzone = document.querySelector(".closeHotZone");

var open_hotzone = document.querySelector('.search-hotbtn');

var delete_history = document.querySelector('.search-historybtn');

var urlSearchTotal = url + "/video/search?type=&name=&page=1&size=" + 1;

let searchcount = 0;

var hotNameMap = new Map();
var hotIdMap = new Map();   //1.避免重名电视剧电影而再创建的IdMap
var sortNameMap = new Map();    //2. key array[0][1] value hotpot
var sortIdMap = new Map();
var searchHistorySet; // 搜索历史
var searchHistoryArray = new Array();

var history_result;     //历史记录li
var history_result_btn;
var searchItem;     // 搜索结果li
var searchId;

index_input.addEventListener("input", searchFunction);
index_input.addEventListener("focus", function () { inputZoneout = setTimeout(() => { searchZone() }, 300) });
index_input.addEventListener("focusout", function () { inputZoneout = setTimeout(() => { closeSearchZone() }, 150) }); //延迟开启关闭搜索栏避免动画bug
open_hotzone.addEventListener("click", hotZone);
close_hotzone.addEventListener("click", closeHotZone);
delete_history.addEventListener('click', clearHistory);

async function searchTotal() {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var data;
    await fetch(urlSearchTotal, requestOptions)
        .then(response => {
            if (response.ok) {
                data = response.json();
            }
            else {
                console("Something error in searchtotal");
            }
        })
    data.then(result => {
        localStorage.setItem('total', result.data.total);
    })
}
searchTotal();  //向服务器询问video全部数量

async function searchHot() {
    var total = localStorage.getItem('total');
    var hotLi = document.createElement('li'); //父节点 search_hot
    // console.log('total', total);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var data;
    var urlSearchHot = url + "/video/search?type=&name=&page=1&size=" + total;
    await fetch(urlSearchHot, requestOptions)
        .then(response => {
            if (response.ok) {
                data = response.json();
            }
            else {
                console("Something error in searchtotal");
            }
        })
    data.then(result => {
        for (let i = 0; i < total; i++) {
            hotNameMap.set(result.data.records[i].name, result.data.records[i].hotpot);
            hotIdMap.set(result.data.records[i].id, result.data.records[i].hotpot);
        }
        // console.log(hotNameMap);
        sortNameMap = new Map([...hotNameMap].sort((a, b) => b[1] - a[1]));
        sortIdMap = new Map([...hotIdMap].sort((a, b) => b[1] - a[1]));
    })
        .then(() => {
            for (let i = 0; i < 8; i++) {
                hotLi = document.createElement('li');
                hotLi.setAttribute("class", 'hot-result');
                hotLi.innerHTML = [...sortNameMap][i][0];
                search_hot.appendChild(hotLi);
            }
            var hotLiArray = document.querySelectorAll('.hot-result');
            // var hotLiArray = addEventListener("click", function(){ console.log(hotLiArray.textContent);});
            for (let x = 0; x < 8; x++) {
                hotLiArray[x].onclick = function () {
                    // console.log(hotLiArray[x].textContent);
                    // console.log([...sortIdMap][x][0]);
                    window.open(`remake-videosite.html?id=${[...sortIdMap][x][0]}`);
                }
            }
        })
}
searchHot();

function searchFunction() { //---可能新增功能
    searchName();
}

async function searchName() {
    if (index_input.value == "" || index_input.value == null) {
        hot_line.style.display = "inline-block";
        history_line.style.display = "inline-block";
        search_history.style.display = "block";
        search_hot.style.display = "block";
        search_line.style.display = "none";
        return;
    }
    else {
        hot_line.style.display = "none";
        history_line.style.display = "none";
        search_history.style.display = "none";
        search_hot.style.display = "none";
        search_line.style.display = "inline-block";
    }
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var data;
    var urlSearchName = url + "/video/search?type=&page=1&size=1&name=" + index_input.value;
    console.log("index_input", urlSearchName);
    await fetch(urlSearchName, requestOptions)
        .then(response => {
            if (response.ok) {
                data = response.json();
            }
            else {
                console("Something error in searchtotal");
            }
        })
    data.then(result => {
        var searchtotal = result.data.total;
        while (searchcount != 0) {
            search_line.removeChild(document.querySelector('.search-result'));
            search_line.removeChild(document.querySelector('.result-img'));
            searchcount--;
        }
        if (searchtotal == 0) {
            return;
        }
        while (searchtotal != 0) {
            var searchImageurl = "url(" + result.data.records[searchcount].cover + ")";
            var searchResultli = document.createElement('li');
            var searchResultspan = document.createElement('span');
            searchResultli.setAttribute('class', 'search-result');
            searchResultspan.setAttribute('class', 'result-img');
            searchResultli.innerHTML = result.data.records[searchcount].name + " " + result.data.records[searchcount].type;
            searchResultli.setAttribute('searchdata', result.data.records[searchcount].brief);
            searchResultspan.style.backgroundImage = searchImageurl;
            // searchResultli.setAttribute('searchcover', searchImageurl);
            search_line.appendChild(searchResultli);
            search_line.appendChild(searchResultspan);
            searchcount++;
            searchtotal--;
        }
        searchItem = document.querySelector('.search-result');
        searchId = result.data.records[0].id;
    })
        .then(() => {
            searchHistory();
        })
}

// window.setTimeout("hotZone()", 1000); //调试使用.
function hotZone() {
    hot_zone.style.display = "inline-block";
    clearTimeout(inputZoneout);
    // hot_zone.style.marginLeft = -200 + 'px'; 
    hot_zone.style.opacity = 0;
    var pos = 1;
    var duration = setInterval(Animation, 0.03);
    function Animation() {
        if (pos == 100) {
            clearInterval(duration);
        }
        else {
            pos++;
            hot_zone.style.opacity = pos / 100;
            hot_zone.style.marginLeft = (-200 + 2 * pos) + 'px';
        }
    }
    var hotlistLi;
    var total = localStorage.getItem('total');
    for (let x = 0; x < total; x++) {
        hotlistLi = document.createElement('li');
        hotlistLi.setAttribute("class", 'hot-listli');
        hotlistLi.innerHTML = [...sortNameMap][x][0];
        hotlistLi.setAttribute('hotdata', [...sortNameMap][x][1]);
        hot_list.appendChild(hotlistLi);
    }
    var hotlistLiArray = document.querySelectorAll(".hot-listli");
    for (let x = 0; x < total; x++) {
        hotlistLiArray[x].onclick = function () {
            // console.log(hotlistLiArray[x]);
            // console.log([...sortIdMap][x][0]);
            window.open(`remake-videosite.html?id=${[...sortIdMap][x][0]}`);
        }
    }
}

function closeHotZone() {
    var pos = 100;
    var duration = setInterval(Animation, 0.05);
    function Animation() {
        if (pos == 0) {
            hot_zone.style.display = "none";
            closeSearchZone();
            clearInterval(duration);
        }
        else {
            pos--;
            hot_zone.style.opacity = pos / 100;
            hot_zone.style.marginLeft = (-200 + 2 * pos) + 'px';
        }
    }

}

function searchZone() {
    search_zone.style.display = "block";
    search_zone.style.opacity = 0;
    hot_zone.style.display = "none";
    var openpos = 1;
    var duration = setInterval(Animation, 0.03);
    function Animation() {
        if (openpos == 100) {
            clearInterval(duration);
        }
        else {
            openpos++;
            search_zone.style.opacity = openpos / 100;
            search_zone.style.marginTop = (-200 + 2 * openpos) + 'px';
        }
    }
}

function closeSearchZone() {
    var pos = 100;
    var duration = setInterval(Animation, 0.05);
    function Animation() {
        if (pos == 0) {
            search_zone.style.display = "none";
            clearInterval(duration);
        }
        else {
            pos--;
            search_zone.style.opacity = pos / 100;
            search_zone.style.marginTop = (-300 + 3 * pos) + 'px';
        }
    }
    hot_zone.style.display = "none";
}

function searchHistory() {
    if (localStorage.getItem('history') != null) {
        searchHistoryArray = Array.from(JSON.parse(localStorage.getItem('history')));
    }
    // searchHistorySet = new Set(searchHistoryArray);
    searchItem.onclick = function () {
        searchHistoryArray.push(searchId);
        searchHistorySet = new Set(searchHistoryArray);
        localStorage.setItem("history", JSON.stringify([...searchHistorySet]));
        // console.log(searchHistorySet);
        loadHistory(1);
        window.open(`remake-videosite.html?id=${searchId}`);
    }
}

function maxHistoryLength() {
    if (localStorage.getItem('history') == null) {
        history_line.style.display = 'none';
        return;
    }
    searchHistoryArray = Array.from(JSON.parse(localStorage.getItem('history')));
    while (searchHistoryArray.length >= 6) {
        searchHistoryArray.shift();
    }
    localStorage.setItem("history", JSON.stringify(searchHistoryArray));
    loadHistory();
}
maxHistoryLength();

async function loadHistory(ops) {
    searchHistoryArray = Array.from(JSON.parse(localStorage.getItem('history')));
    if (ops == 1) {
        while (document.querySelector('.history-result') != null) search_history.removeChild(document.querySelector('.history-result'));
    }
    console.log(searchHistoryArray);
    for (let x = 0; x < searchHistoryArray.length; x++) {
        // console.log(searchHistoryArray[x]);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            'Content-Type': "application/json",
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            mode: "cors",
        };
        var data;
        var urlHistory = url + '/video/query?id=' + String(searchHistoryArray[x]);
        await fetch(urlHistory, requestOptions)
            .then(response => {
                if (response.ok) {
                    data = response.json();
                }
                else {
                    console("Something error in searchtotal");
                }
            })
        data.then(result => {
            history_result = document.createElement('li');
            history_result.setAttribute('class', 'history-result');
            history_result.innerHTML = result.data.name;
            search_history.appendChild(history_result);
            history_result_btn = document.querySelectorAll('.history-result');
        })
            .then(() => {
                history_result_btn[x].onclick = function () {
                    window.open(`remake-videosite.html?id=${searchHistoryArray[x]}`);
                }
            })
    }
}

function clearHistory() {
    localStorage.removeItem('history');
    searchHistoryArray = JSON.parse(localStorage.getItem('history'));
    while (document.querySelector('.history-result') != null) search_history.removeChild(document.querySelector('.history-result'));
    history_line.style.display = 'none';
    location.reload();
    // console.log(searchHistoryArray);
}

function historyload() {    //调试历史功能
    if (localStorage.getItem('history') != null) {
        searchHistoryArray = Array.from(JSON.parse(localStorage.getItem('history')));
    }
    console.log(searchHistoryArray);
}
// historyload();