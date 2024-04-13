var login_button = document.querySelector("#login-button");

var reg_button = document.querySelector("#reg-button");

var change_button = document.querySelector('.change-content');

var isLogin = false; //全局变量

//假设 token 已经存储 于 本地或 cookie
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7aWQ9NH0iLCJpYXQiOjE3MTEwMDE4MDksImV4cCI6MTcxMzU5MzgwOX0.vNSaeC77IwR5k1SMJnGz370wJEbt5qUwdeLK868EidMhfQHvRYfAwxiPKrPH79ATLorLbGM2Fit3RYWeGuaymA"

var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var url = "https://blog.zifeiyu.love";

var urlChange = url + "/video/random?size=4";

function isLogin() {
    // if () { }
}

login_button.onclick = async function () {
    var username = document.querySelector("#login-username").value;
    var password = document.querySelector("#login-password").value;
    var urlLogin = url + "/user/login" +"?" + "username=" + username + "&" + "password=" + password;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var Login_Data;  //起名 Reg_Data 与 Login_Data 只为更容易辨认
    var Login_Result;
    let response = await fetch(urlLogin, requestOptions) //fetch
        .then(function (response) {
            if (response.ok == true) {
                Login_Data = response.json();     //转化为json
            }
            else {
                console.log("Something Wrong in response TAT");
            }
        }
    )
    // var Reg_Result = Reg_Data.selectVaildEvent();
    Login_Data.then(result => {
        // console.log(result.errorMsg);
        // Reg_Result = result;
        // return result;
        if (result.errorMsg == null) {
            alert("登录成功!");
            isLogin = true; // 标记成功登录
            // setTimeout(SuccessReg, 1000);
        }
        else {
            alert("错误的用户名和密码");
        }
        console.log(result.data);
    })
    
    console.log(Login_Data);
}

reg_button.onclick = async function () {
    var username = document.querySelector("#reg-username").value;
    var password = document.querySelector('#reg-password').value;
    var urlReg = url + "/user/register" + "?" + "username=" + username + "&" + "password=" + password;
    var data = {
        "username": username,
        "password": password,
    };
    if (username == '' || password == '') {
        //正则表达式
        alert("用户名或者密码不能为空!");
        return;
    }
    
    // console.log(urlReg);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var Reg_Data;
    var Reg_Result;
    let response = await fetch(urlReg, requestOptions) //fetch
        .then(function (response) {
            if (response.ok == true) {
                Reg_Data = response.json();     //转化为json
            }
            else {
                console.log("Something Wrong in response TAT");
            }
        }
    )
    // var Reg_Result = Reg_Data.selectVaildEvent();
    Reg_Data.then(result => {
        // console.log(result.errorMsg);
        // Reg_Result = result;
        // return result;
        if (result.errorMsg == null) {
            alert("注册成功!即将返回登录!");
            // setTimeout(SuccessReg, 1000);
        }
        else {
            alert("重复的用户名!");
        }
    })
    
    console.log(Reg_Data);
    // console.log(result);
    // console.log(Reg_Result);

}

change_button.onclick = function () {
    var change_xml = new XMLHttpRequest();
    change_xml.open("GET", urlChange, true);
    change_xml.onreadystatechange = function () {
        if (change_xml.readyState == 4 && change_xml.status == 200) {
            console.log(change_xml.responseType);
        }
    }
    change_xml.
    change_xml.send();
}
