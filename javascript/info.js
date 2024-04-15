var user_name = document.querySelector(".person-name");

var logoff_btn = document.querySelector(".logoff-btn");

var logo = document.querySelector('.top-logo');

var url = "https://blog.zifeiyu.love";

let token = localStorage.getItem("token");

console.log(token);

logo.addEventListener("click", toIndex);
logoff_btn = addEventListener("click", logoff);

function toIndex() {
    window.location.href = "index.html";
}

var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    
async function isLogin() {
    var urlisLogin = url + "/info/query";
    let token = localStorage.getItem("token");
    // console.log("isLogin?");
    console.log(token);
    // console.log(urlisLogin);
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
                // console.log(isLoginData);
                // console.log(token);
           }
            else {
                console.log("Something Wrong in isLogin TAT");
            }
        }
    )
        isLoginData.then(result => {
            if (result.errorMsg == "未登录" || result.errorMsg == "身份异常") {
                alert("未登录！请登录！");
                return; 
            }
            else {
                // console.log(result.errorMsg); //正常时为null
                // console.log(result);
                user_name.innerHTML=(result.data.username);
            }
        })
        console.log(token);
}
isLogin();

async function logoff() {
    var urlLogoff = url + "/user/logoff";
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var logoffData;
    await fetch(urlLogoff, requestOptions)
        .then(function (response) {
            if (response.ok == true) {
                logoffData = response.json();     //转化为json
                // console.log(isLoginData);
                // console.log(token);
           }
            else {
                console.log("Something Wrong in Logoff TAT");
            }
        }
    )
    logoffData.then(result => {
        if (result.errorMsg == null) {
            alert("成功注销您的账号");
        }
        else {
            console.log("Something Error in Logoff.errorMsg!");
            return; 
        }
    })
}