var login_button = document.querySelector("#login-button");

var reg_button = document.querySelector("#reg-button");

var change_button = document.querySelector('.change-content');

var myRegHeaders = new Headers();
    myRegHeaders.append("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7aWQ9NH0iLCJpYXQiOjE3MTEwMDE4MDksImV4cCI6MTcxMzU5MzgwOX0.vNSaeC77IwR5k1SMJnGz370wJEbt5qUwdeLK868EidMhfQHvRYfAwxiPKrPH79ATLorLbGM2Fit3RYWeGuaymA");
    myRegHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

var url = "https://blog.zifeiyu.love";

var urlChange = url + "/video/random?size=4";
    
// login_button.onclick = function() {
//     const login_xhr = new XMLHttpRequest();
//     login_xhr.open("GET", "", true);
// }

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
    
    console.log(urlReg);

    var requestOptions = {
        method: 'POST',
        headers: myRegHeaders,
        // redirect: 'follow',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        // "Cache-Control" : "no-cache",
        mode: "cors",
        body: JSON.stringify(data),
        Connection : "keep-alive",
    }; 

    // try {
        let response = await fetch(urlReg, requestOptions) //fetch
            .then(function (response) {
                if (response.ok == true) {
                    return response.blob();
                }
                else console.log(response.type);
            }
        )
    // }
        // .then(data => console.log(data))
        // console.log(response.body); 

    // .then(data => console.log(data));

}

change_button.onclick = async function () {
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
