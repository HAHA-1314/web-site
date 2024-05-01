var avatar_btn = document.querySelector(".avatar-upload");

var avatar_input = document.querySelector(".avatar-input");

avatar_btn.addEventListener("click", avatar_upload);

async function modify(avatar_data) {
    var urlMod = url + "/user/modify";
    var Data;
    console.log('avatar', avatar_data);
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
                Data = response.json();     //服务器返回的内容转化为json赋予Data;
                // console.log(mod_body);
                console.log(Data);
            }
            else {
                console.log("Something Wrong in Modify TAT");
                return;
            }
        }) 
    Data.then(result => { //Data有数据之后执行
        console.log(result);
    })
}

function avatar_upload() {  //用户点击头像上传
    if (isLogined == 0) {
        alert("未登录！！");    
        return;     // 用户没有登录的情况
    }
    avatar_input.click(); //模拟点击input，呼出选择文件页面
    var avatarRead = new FileReader();  //用于检测头像是否上传完成，避免未上传就执行fetch
    var avafile;    //头像文件
    avatar_input.onchange = function () {       //用户上传头像后
        avafile = document.querySelector(".avatar-input").files; //获取本地头像文件
        avatarRead.readAsDataURL(avafile[0]); //将头像文件写入avatarRead
        console.log(avafile[0]);        //调试行
        console.log(avatarRead.readyState); //调试行
        // alert("已成功上传图片!");
    };
    // ajax fetch 
    avatarRead.addEventListener("load", async function () { //头像加载完毕后上传头像给服务器
        var urlAva = url + "/info/pic";
        let res = new FormData();       //请求头body
        res.append("file", avafile[0]);
        console.log(res);   //调试行
        console.log(avatarRead.readyState); //调试行
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            mode: "cors",
            // body: JSON.stringify(res),
            body: res,
        }; 
        var Data; 
        await fetch(urlAva, requestOptions) //fetch
            .then(function (response) {
                if (response.ok) {
                    Data = response.json();     //服务器返回的内容转化为json赋予Data;
                    // console.log(Login_Data);
                }
                else {
                    console.log("Something Wrong in avatar TAT");
                }
            }
        )
        Data.then(result => {     //Data有数据之后执行
        if (result.errorMsg == null) {  //服务器返回成功的数据
            alert("上传成功!");
            console.log(result);
            localStorage.setItem("avafileUrl", result.data); 
            modify(result.data); //errorMsg: "Content type 'text/plain;charset=UTF-8' not supported",//执行修改用户头像函数
            // location.reload();  
        }
        else {
            alert("错误TAT");
            console.log(result);
        }
        }) //ava_data.then
    })  //fetch.then    
}