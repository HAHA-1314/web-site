var user_name = document.querySelector("#user-name");

var user_name_2 = document.querySelector("#user-name-2");

var avatar = document.querySelector('#touxiang-link');

var avatar_2 = document.querySelector('.user-avatar');

var token = localStorage.getItem("token");

var isLogined = 0;

var url = "https://blog.zifeiyu.love";

var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

console.log(token);

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
        var ava_pic;
            if (result.errorMsg == "未登录" || result.errorMsg == "身份异常") {
                return; 
            }
            else {
                if (localStorage.getItem("avafileUrl") != "" && localStorage.getItem("avafileUrl") != null) {
                    ava_pic = localStorage.getItem("avafileUrl");
                    console.log("avafileUrl", ava_pic);
                    avatar.setAttribute("src", ava_pic);
                    avatar_2.setAttribute('src', ava_pic);
                }
                console.log(result.data.username);
                ava_pic = localStorage.getItem("avafileUrl");
                console.log("avafileUrl", ava_pic);
                user_name.innerHTML = result.data.username;
                user_name_2.innerHTML = result.data.username;
                isLogined = 1;
            }
        })

}
isLogin();