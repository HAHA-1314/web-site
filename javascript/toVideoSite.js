var popularArray = document.querySelectorAll('.popular'); 

var subBtn = document.querySelectorAll('.sub-btn');

// console.log(popularArray); // 0-5 第一行 6-11 第二行

function clickPopular() {
    for (let x = 0; x < popularArray.length; x++){
        
        popular_description[x]=popular_name[x].onclick = function () {
            // console.log(popularList[x]);
            window.open(`remake-videosite.html?id=${popularList[x]}`);
        }
        subBtn[x].onclick = function () {
            addFavorite(popularList[x],x);
        }
    }
}
clickPopular();

