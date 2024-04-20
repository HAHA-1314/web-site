var logout_btn = document.querySelector('.login-out-btn');

logout_btn.addEventListener('click', logout);

async function logout () {
    var urlLogout = url + "/user/logout";
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var LogoutData;
    response = await fetch(urlLogout, requestOptions)
        .then(response => {
            if (response.ok) {
                LogoutData = response.json();
            }
            else {
                console.log("Something Error in Logout!");
            }
        })
    LogoutData.then(result => {
        if (result.errorMsg == null) {
            alert("成功退出登录！");
            location.reload();
        }
        else {
            alert("失败！TAT");
        }
    })
}