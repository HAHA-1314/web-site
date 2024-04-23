let close_btn = document.querySelector('.close-ad');
let adver_modal = document.querySelector('.game-ad');
let game_modal = document.querySelector('.game-display-box'); //轮播模块
let nav_a = document.querySelectorAll('.nav-a'); //按钮模块
let nav_modal = document.querySelector('.promo-nav'); //按钮容器

// console.log(nav_a); 从左至右的数列

close_btn.addEventListener("click", closead);
game_modal.addEventListener("mouseenter", pause);
game_modal.addEventListener("mouseleave", start);
nav_modal.addEventListener("mouseenter", pause);
nav_modal.addEventListener("mouseleave", start);

let timer = 2200;
let i = 1; //计数器
// var run; //settimeout
const count = 6; //一共有六个模块轮换

function pause() {
    clearTimeout(run);
}

function start() {
    autoPlay();
}

function closead() {
    adver_modal.style.display = 'none';
}

function autoPlay() {
    // -415*（n-1）等于 第 n 张 图片
        run = setTimeout(() => {    
            var left;
            // game_modal.style.marginLeft = ((i % count == 0) ? -415 * 5 : (-415 * (i % count - 1))) + "px";
            left = (i % count == 0) ? 0 : (-415 * (i % count -1) - 415);
            // console.log(left);
            runAnimation(left);
            i++;
            autoPlay();
            changeButton(i);
        }, timer);
    //无动画版本
}
autoPlay();

function changeButton(i) {
    for (let x = 0; x < count; x++) {
        nav_a[x].style.backgroundColor = "#fff3";
    }
    (i%count==0) ? nav_a[5].style.backgroundColor = "white" : nav_a[i%count-1].style.backgroundColor = "white";
}
changeButton(i); //初始化

for (let x = 0; x < count; x++) {
    nav_a[x].onmouseover = function () {
        // x != i % count - 1 为鼠标在 除了最右端 高光按钮上   
        // x == 5 && i % count == 0 为 鼠标在最右端的 高光按钮上 
        if (x != i % count -1 && !(x == 5 && i % count == 0)) {
            nav_a[x].style.backgroundColor = "#fff8";
        }
    }
    nav_a[x].onmouseleave = function () {
        // x != i % count - 1 为鼠标在 除了最右端 高光按钮上   
        // x == 5 && i % count == 0 为 鼠标在最右端的 高光按钮上 
        if ((x != i % count -1) && !(x == 5 && i % count == 0)) {
            nav_a[x].style.backgroundColor = "#fff3";
        }
        
    }
    nav_a[x].onclick = function () {
        clickTurn(x);
    }
}

function clickTurn(x) {
    if (x == (i % count -1 ) ) {
        return;
    }
    else {
        // game_modal.style.marginLeft = -415 * x + "px";
        runAnimation(-415 * x);
        i = x + 1;
        changeButton(i);
    }
}

function runAnimation(marleft) {
    let pos = (i%count == 0) ? -415*5 : (i%count-1)*-415;
    var run_duration = setInterval(runfunction, 0.01);
    function runfunction() {
        if (pos == marleft) {
            clearInterval(run_duration);
        }
        else {
            if (Math.abs(pos - marleft) > 100) {
                if (pos > marleft) pos-=100;
                else pos+=100;
            }
            else {
                if (pos > marleft) pos--;
                else pos++;
            }
            game_modal.style.marginLeft = pos + "px";
        }
    }
}