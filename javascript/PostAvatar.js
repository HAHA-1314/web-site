var avatar_btn = document.querySelector(".avatar-upload");

var avatar_input = document.querySelector(".avatar-input");

avatar_btn.addEventListener("click", avatar_upload);

async function modify(avatar_data) {
    var urlMod = url + "/user/modify";
    var Mod_Data;
    var mod_body = JSON.stringify({
        "avatar": avatar_data,
        "isSeen": '1',
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
        // body: JSON.stringify(res),
        body: mod_body,
    }; 
    await fetch(urlMod, requestOptions)
        .then(function (response) {
            if (response.ok) {
                Mod_Data = response.json();     //转化为json
                console.log(mod_body);
                console.log(Mod_Data);
            }
            else {
                console.log("Something Wrong in Modify TAT");
                return;
            }
        }) 
    Mod_Data.then(result => {
        console.log(result);
    })
}

function avatar_upload() {
    if (isLogined == 0) {
        alert("未登录！！");
        return;
    }
    avatar_input.click();
    var avatarRead = new FileReader();
    var avaurl;
    var avafile;
    avatar_input.onchange = function () {
        avafile = document.querySelector(".avatar-input").files;
        avatarRead.readAsDataURL(avafile[0]);
        console.log(avafile[0]);
        console.log(avatarRead.readyState);
        // alert("已成功上传图片!");
    };
    // ajax fetch 
    avatarRead.addEventListener("load", async function () {
        var urlAva = url + "/info/pic";
        // let res = {
        //     'avatar': avaurl,
        //     'isSeen': 1, //默认收藏可见
        // }
        let res = new FormData();
        res.append("file", avafile[0]);
        console.log(res);
        console.log(avatarRead.readyState);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            mode: "cors",
            // body: JSON.stringify(res),
            body: res,
        }; 
        var Ava_Data; 
        await fetch(urlAva, requestOptions) //fetch
            .then(function (response) {
                if (response.ok) {
                    Ava_Data = response.json();     //转化为json
                    // console.log(Login_Data);
                }
                else {
                    console.log("Something Wrong in avatar TAT");
                }
            }
        )
          Ava_Data.then(result => {
        if (result.errorMsg == null) {
            alert("上传成功!");
            console.log(result);
            localStorage.setItem("avafileUrl", result.data);
            modify(result.data); //errorMsg: "Content type 'text/plain;charset=UTF-8' not supported",
            location.reload();  
        }
        else {
            alert("错误TAT");
            console.log(result);
        }
        }) //ava_data.then
    })  //fetch.then    
}