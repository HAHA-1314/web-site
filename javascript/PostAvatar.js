var avatar_btn = document.querySelector(".avatar-upload");

var avatar_input = document.querySelector(".avatar-input");

avatar_btn.addEventListener("click", avatar_upload);

function avatar_upload() {
    avatar_input.click();
    var avatarRead = new FileReader();
    avatar_input.onchange = function () {
        var avafile = document.querySelector(".avatar-input").files;
        avatarRead.readAsDataURL(avafile[0]);
        // console.log(avafile);
        console.log(avafile[0]);
        console.log(avatarRead.readyState);
        // alert("已成功上传图片!");
    };
    // ajax
    avatarRead.addEventListener("load", async function () {
        var urlAva = url + "/info/pic";
        // console.log(avatarRead.readyState);
        let res = avatarRead.result;
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            'Content-Type' : "application/json",
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            mode: "cors",
            body: res,
        }; 
        var Ava_Data;  //起名 Reg_Data 与 Login_Data 只为更容易辨认
        await fetch(urlAva, requestOptions) //fetch
            .then(function (response) {
                if (response.ok == true) {
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
            // location.reload();
        }
        else {
            alert("错误TAT");
        }
    })
    })
    
}