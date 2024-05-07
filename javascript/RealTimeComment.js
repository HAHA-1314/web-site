var commentBulletSpan;

var video_box = document.querySelector('.video-box');

var bullet_tips = document.querySelector('.bullet-tips');

var bullet_father = document.querySelector('.bullet-father');

var shootDuration = 800; //弹幕滞留时间
var shootTheComment; //计时器

var bullettop = 0;
var bullet_send = 0;

var pos = new Array();
var hascreateBullet = 0;
// var bulletArray = new Array(); //  0 userid 1 happentime 2 content

function createBullet() {
    hascreateBullet = 1;
    bullet_tips.style.display = 'inline-block';
    bullet_tips.innerHTML = `一共有${bulletUserIdArray.length}条弹幕大军袭来`;
    setTimeout(() => { bullet_tips.style.display = 'none'; }, 2000);
    for (let i = 0, x = 0; x < bulletUserIdArray.length; x++) {
        console.log("bulletHappenTimeArray", bulletHappenTimeArray[x]);
        console.log('i', i);
        console.log('top', 0);
        commentBulletSpan = document.createElement('span');
        commentBulletSpan.setAttribute('class', 'bullet-span');
        commentBulletSpan.innerHTML = bulletContentArray[x];
        commentBulletSpan.style.top = bullettop + 'px';
        bullet_father.appendChild(commentBulletSpan);
        if (bulletUserIdArray[x] == userId) {
            commentBulletSpan.style.border = '2px solid white';
        }
        if (bulletHappenTimeArray[x] <= i || bulletHappenTimeArray[x] == bulletHappenTimeArray[x + 1]) {
            bullettop += 60;
        }
        if (bulletHappenTimeArray[x] > i) {
            i += shootDuration;
        }
    }
    commentBulletSpan = document.querySelectorAll('.bullet-span');
    // console.log(commentBulletSpan);
}


function bulletShoot() {
    for (let x = 0; x < bulletUserIdArray.length; x++) pos[x] = 0;
    shootTheComment = setInterval(() => {
        if (bullet_send == bulletUserIdArray.length - 1) {
            clearInterval(shootTheComment);
            return;
        }
        if (bulletHappenTimeArray[bullet_send] - 5 <= ((videoNow.currentTime * 1000) | 0)) {
            bulletAnimation(bullet_send);
            console.log('shoot');
            bullet_send++;
        }
    }, 10)
}

function bulletAnimation(x) {
    commentBulletSpan[x].style.display = 'inline-block';
    // commentBulletSpan[x].style.marginLeft = 0 + 'px';
    commentAnimation = setInterval(() => {
        console.log(videoNow.offsetWidth);
        console.log('pos', pos);
        if (pos[x] >= videoNow.offsetWidth) {
            commentBulletSpan[x].style.display = 'none';
            commentBulletSpan[x].style.marginLeft = 0 + 'px';
            bullet_father.removeChild(commentBulletSpan[x]);
            // clearInterval(commentAnimation);
            return;
        }
        else {
            pos[x] += 10;
            commentBulletSpan[x].style.marginLeft = -(pos[x]) + 'px';
        }
    }, 10)
}

videoNow.onended = function () {
    bullet_send = 0;
    clearInterval(commentAnimation);
    for (let x = 0; x < bulletUserIdArray.length; x++) {
        pos[x] = 0;
        commentBulletSpan[x].style.display = 'none';
        commentBulletSpan[x].style.marginLeft = 0 + 'px';
        bullet_father.appendChild(commentBulletSpan[x]);
    }
};