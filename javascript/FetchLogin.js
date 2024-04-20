var login_button = document.querySelector("#login-button");

var reg_button = document.querySelector("#reg-button");

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
            localStorage.clear("token");
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
