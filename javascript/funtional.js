var login_modal = document.querySelector(".login-modal");

var login_back = document.querySelector(".login-back");

var login_close = document.querySelector(".login-close");

var login = document.querySelector('#avatar-drop-box');

var login_1 = document.querySelector('#touxiang-link');

var login_2 = document.querySelector('#vip-drop-content-5');

var login_unselected = document.querySelector(".un-selected");

var login_isselected = document.querySelector(".is-selected");

var login_qq = document.querySelector(".login-qq-modal");

var login_wx = document.querySelector(".login-wx"); 

var login_alert = document.querySelector(".login-alert");   //请勾选用户协议

var login_selected = 0;    //用户登录是否同意政策

var login_in = 0;

// console.log(login_unselected.style.display);
// console.log(login_selected);


// login_wx.addEventListener("click", myLoginWX);
login_1.addEventListener("click", myLoginOpen);
login_2.addEventListener("click", myLoginOpen);
login.addEventListener("click", myLoginOpen);
login_close.addEventListener("click", myLoginClose);
login_unselected.addEventListener("click", loginSelected);
login_isselected.addEventListener("click", loginSelected);
login_qq.addEventListener("click", myLoginQQ);
login_wx.addEventListener("click", myLoginWX);

function myLoginOpen() {
    login_modal.style.display = "inline-block";
    login_back.style.display = "inline-block";
    login_qq.style.display = "none";
}

function myLoginClose() {
    login_modal.style.display = "none";
    login_back.style.display = "none";
    login_qq.style.display = "none";
    // console.log("yes");
}

function loginSelected() {
    if (login_selected == 0 ) {
        login_isselected.style.display = "block";   //协议选中
        login_unselected.style.display = "none";
        login_selected = 1;
        login_alert.style.display = "none";
    }
    else {
        login_isselected.style.display = "none";    //协议取消
        login_unselected.style.display = "block";
        login_selected = 0;
    }
}

function myLoginQQ() {
    if (login_selected == 0) {
        login_alert.style.display = "inline-block";
    }
    else {
        login_qq.style.display = "block";
    }
}

function myLoginWX() {
    if (login_selected == 0) {
        login_alert.style.display = "inline-block";
    }
    else {
        console.log(wx);
    }
}