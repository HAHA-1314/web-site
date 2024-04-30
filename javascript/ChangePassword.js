var change_button = document.querySelector('#change-button');

var oldPassword = document.querySelector('#change-oldPassword');

var newPassword = document.querySelector('#change-newPassword');

var change_close_button = document.querySelector(".change-close");

var change_modal = document.querySelector('.change-qq-modal');

var change_open_button = document.querySelector('.change-btn');

change_open_button.onclick = function () {
    login_back.style.display = "block";
    change_modal.style.display = "block";
}

change_close_button.onclick = function () {
    login_back.style.display = "none";
    change_modal.style.display = "none";
}

change_button.onclick = async function () {
    var urlChangePassword = url + "/info/change?ordPass=" + oldPassword.value + "&newPass=" + newPassword.value;
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var Data; 
    await fetch(urlChangePassword, requestOptions) //fetch
        .then(function (response) {
            if (response.ok == true) {
                Data = response.json();     //转化为json
                // console.log(Data);
            }
            else {
                console.log("Something Wrong in changePassword TAT");
            }
        }
    )
        Data.then( result => {
            if (result.errorMsg == "旧密码不匹配") {
                alert("旧密码错误！")
            }
            else if (result.errorMsg == null){
                alert("修改密码成功!")
            }
        })
}