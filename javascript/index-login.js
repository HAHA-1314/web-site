var login_button = document.querySelector("#login-button");

var reg_button = document.querySelector("#reg-button");

var change_button = document.querySelector('.change-content');

var person_name = document.querySelector('.person-name');

let token = localStorage.getItem("token");

var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var url = "https://blog.zifeiyu.love";

var urlChange = url + "/video/random?size=4";

async function isLogin() {
    var urlisLogin = url + "/info/query";
    let token = localStorage.getItem("token");
    // console.log("isLogin?");
    // console.log(token);
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
                return; 
            }
            else {
                console.log(result.errorMsg); //正常时为null
                console.log(result);
                // alert("用户已经登录过了");
                person_name.innerHTML=(result.data.username);
            }
        })
        console.log(token);
}
isLogin();  //直接执行，每次页面刷新都进行一次判断

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
    await fetch(urlLogin, requestOptions) //fetch
        .then(function (response) {
            if (response.ok == true) {
                Login_Data = response.json();     //转化为json
                // console.log(Login_Data);
            }
            else {
                console.log("Something Wrong in response TAT");
            }
        }
    )
    Login_Data.then(result => {
        if (result.errorMsg == null) {
            alert("登录成功!");
            localStorage.clear();
            localStorage.setItem("token", result.data.tokenValue);
            token = localStorage.getItem("token");
            console.log(token);
            location.reload();
            // setTimeout(SuccessReg, 1000);
        }
        else {
            alert("错误的用户名和密码");
        }
    })
}

reg_button.onclick = async function () {
    var username = document.querySelector("#reg-username").value;
    var password = document.querySelector('#reg-password').value;
    var urlReg = url + "/user/register" + "?" + "username=" + username + "&" + "password=" + password;
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
    await fetch(urlReg, requestOptions) //fetch
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

change_button.onclick = async function () {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var changeData;
    await fetch(urlChange, requestOptions)
        .then(response => {
            if(response.ok) 
            {
                changeData = response.json();
            }
            else {
                console("Something error in change");
            }
        })
        changeData.then(result => {
            console.log(result.data[0]);
            console.log(result.data[1]);
            console.log(result.data[2]);
            console.log(result.data[3]);
    })
}
