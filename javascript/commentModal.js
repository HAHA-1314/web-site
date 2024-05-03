var discussbtn = document.querySelector('.discuss-login');

var discussarea = document.querySelector('.discuss-input');

discussarea.addEventListener('click', discussFunction);
discussbtn.addEventListener('click', discussFunction);

function discussisLogined() {
    if (isLogined == 1) {
        // discussbtn.style.display = 'none';
        discussbtn.innerHTML = '发表您的看法';
        discussbtn.style.backgroundColor = 'rgb(48, 47, 47)';
        discussbtn.style.color = '#d8dad3';
    }
    else {

    }
}

function discussFunction() {
    console.log('discuss');
}