var popularArray = document.querySelectorAll('.popular');

// console.log(popularArray); // 0-5 第一行 6-11 第二行

function clickPopular() {
    for (let x = 0; x <  popularArray.length; x++){
        popularArray[x].onclick = function () {
            // console.log(popularList[x]);
            window.open(`remake-videosite.html?id=${popularList[x]}`);
        } 
    }
}
clickPopular();

