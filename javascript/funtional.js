var login_modal = document.querySelector(".login-modal");

var login_back = document.querySelector(".login-back");

var reg_back = document.querySelector("#reg-back");

var login_close = document.querySelector(".login-close");

var login_close_1 = document.querySelector(".login-qq-close");

var login_close_2 = document.querySelector(".reg-close");

var login = document.querySelector('#avatar-drop-box');

var login_1 = document.querySelector('#touxiang-link');

var login_2 = document.querySelector('#vip-drop-content-5');

var login_unselected = document.querySelector(".un-selected");

var login_isselected = document.querySelector(".is-selected");

var login_qq = document.querySelector(".login-qq");

var login_qq_modal = document.querySelector(".login-qq-modal");

var reg_qq_modal = document.querySelector(".reg-qq-modal");

var go_login = document.querySelector(".go-to-login-btn");

var go_reg = document.querySelector(".go-to-reg-btn");

var login_wx = document.querySelector(".login-wx"); 

var login_alert = document.querySelector(".login-alert");   //请勾选用户协议

var login_selected = 0;    //用户登录是否同意政策

const url = "https://blog.zifeiyu.love";

var token = localStorage.getItem("token");

var login_in = 0;

// console.log(login_unselected.style.display);
// console.log(login_selected);
// login_wx.addEventListener("click", myLoginWX);
login_1.addEventListener("click", myLoginOpen);
login_2.addEventListener("click", myLoginOpen);
login.addEventListener("click", myLoginOpen);
login_close.addEventListener("click", myLoginClose);
login_close_1.addEventListener("click", myLoginClose);
login_close_2.addEventListener("click", myLoginClose);
login_unselected.addEventListener("click", loginSelected);
login_isselected.addEventListener("click", loginSelected);
login_qq.addEventListener("click", myLoginQQ);
login_back.addEventListener("click", myLoginBack);
reg_back.addEventListener("click", myLoginQQ);
go_reg.addEventListener("click", myRegQQ);
go_login.addEventListener("click", myLoginQQ);
// login_wx.addEventListener("click", myLoginWX);

async function isLogin() {
    var urlisLogin = url + "/info/query";
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var isLoginData;
    await fetch(urlisLogin, requestOptions)
        .then(function (response) {
            if (response.ok == true) {
                isLoginData = response.json();     //转化为json
           }
            else {
                console.log("Something Wrong in isLogin TAT");
            }
        }
    )
        isLoginData.then(result => {
            if (result.errorMsg == "未登录" || result.errorMsg == "身份异常") {
                return; 
            }
            else {
                login_in = 1;
            }
        })

}
isLogin();

function myLoginOpen() {
    login_modal.style.display = "inline-block";
    login_back.style.display = "block";
    login_qq_modal.style.display = "none";
}

function myLoginClose() {
    login_modal.style.display = "none";
    login_back.style.display = "none";
    login_qq_modal.style.display = "none";
    reg_qq_modal.style.display = "none";
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
        reg_qq_modal.style.display = "none";
        login_qq_modal.style.display = "block";
    }
}

function myLoginWX() {
    if (login_selected == 0) {
        login_alert.style.display = "inline-block";
    }
    else {
        reg_qq_modal.style.display = "none";
        console.log(wx);
    }
}

function myLoginBack() {
    login_qq_modal.style.display = "none";
    reg_qq_modal.style.display = "none";
    login_modal.style.display = "block"; 
}

function myRegQQ() {
    login_qq_modal.style.display = "none";
    reg_qq_modal.style.display = "block";
}


