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

var urlSearchTotal = url + "/video/search?type=&name=&page=1&size=" + 1;

var hotNameMap = new Map();
var hotIdMap = new Map();   //1.避免重名电视剧电影而再创建的IdMap
var sortNameMap = new Map();    //2. key array[0][1] value hotpot
var sortIdMap = new Map();

index_input.addEventListener("input", searchFunction);
open_hotzone.addEventListener("click", hotZone);
close_hotzone.addEventListener("click", closeHotZone);

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
searchTotal();

async function searchHot() {
    var total = localStorage.getItem('total');
    var hotLi = document.createElement('li'); //父节点 search_hot
    console.log('total', total);
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
        console.log(hotNameMap);
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
            for (let x = 0; x < 8; x++){
                hotLiArray[x].onclick = function () {
                    // console.log(hotLiArray[x].textContent);
                    console.log([...sortIdMap][x][0]);
                }
            }
            console.log(hotLiArray);
            console.log(hotLiArray[1].textContent);
        })
}
searchHot();

function searchFunction() {
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
        if (result.data.total == 0) {
            return;
        }
        var searchResultli = document.createElement('li');
        searchResultli.setAttribute('class', 'search-result');
        searchResultli.innerHTML = result.data.records[0].name + " " + result.data.records[0].type;
        searchResultli.setAttribute('searchdata', result.data.records[0].brief);
        searchResultli.setAttribute("searchcover", + result.data.records[0].cover);
        console.log(searchResultli.getAttribute('searchcover'));
        search_line.appendChild(searchResultli);
            console.log(result.data.records[0].name,result.data.records[0].id,result.data.records[0].brief)
        })
}

// window.setTimeout("hotZone()", 1000); //调试使用.
function hotZone() {
    hot_zone.style.display = "inline-block";
    // hot_zone.style.marginLeft = -200 + 'px'; 
    hot_zone.style.opacity = 0;
    var pos = 1;
    var duration = setInterval(Animation, 0.05);
    function Animation() {
        if (pos == 100 ) {
            clearInterval(duration);
        }
        else {
            pos++;
            hot_zone.style.opacity = pos/100;
            hot_zone.style.marginLeft = (-200+2*pos) + 'px';
        }
    }
    var hotlistLi;
    var total = localStorage.getItem('total');
    for (let x = 0; x < total; x++){
        hotlistLi = document.createElement('li');
        hotlistLi.setAttribute("class", 'hot-listli');
        hotlistLi.innerHTML = [...sortNameMap][x][0];
        hotlistLi.setAttribute('hotdata',[...sortNameMap][x][1]);
        hot_list.appendChild(hotlistLi);
    }
    var hotlistLiArray = document.querySelectorAll(".hot-listli");
    for (let x = 0; x < total; x++){
        hotlistLiArray[x].onclick = function () {
            // console.log(hotlistLiArray[x]);
            console.log([...sortIdMap][x][0]);
        }
    }
    console.log("hotzone", sortNameMap);
}

function closeHotZone() {
    var pos = 100;
    var duration = setInterval(Animation, 0.05);
    function Animation() {
        if (pos == 0) {
            hot_zone.style.display = "none";
            clearInterval(duration);
        }
        else {
            pos--;
            hot_zone.style.opacity = pos/100;
            hot_zone.style.marginLeft = (-200+2*pos) + 'px';
        }
    }
    
}