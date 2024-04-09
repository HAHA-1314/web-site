var intro_open = document.querySelector('#intro-btn');

var intro_close = document.querySelector('#intro-close-btn');

var intro_modal = document.querySelector('.intro-modal');

intro_open.addEventListener("click", videoIntroOpen);
intro_close.addEventListener("click", videoIntroClose);

function videoIntroOpen() {
    intro_modal.style.display = "inline-block";
    intro_modal.style.opacity = "0";
    var pos = 1;
    var intro_duration = setInterval(introAnimation, 0.05);
    function introAnimation() {
        if (pos == 100 ) {
            clearInterval(intro_duration);
        }
        else {
            pos++;
            intro_modal.style.opacity = pos/100;
            intro_modal.style.marginLeft = (400-4*pos) + 'px';
        }
    }
}

function videoIntroClose() {
    intro_modal.style.opacity = "1";
    var pos = 100;
    var intro_duration = setInterval(introAnimation, 0.5);
    function introAnimation() {
        if (pos == 0) {
            intro_modal.style.display = "none";
            clearInterval(intro_duration);
        }
        else {
            pos--;
            intro_modal.style.opacity = pos/100;
            intro_modal.style.marginLeft = (400-4*pos) + 'px';
        }
    }
}

