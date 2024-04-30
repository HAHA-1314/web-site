var logoff_btn = document.querySelector(".logoff-btn");

logoff_btn.addEventListener("click", logoff);

async function logoff() {
    var urlLogoff = url + "/user/logoff";
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type' : "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    }; 
    var logoffData;
    await fetch(urlLogoff, requestOptions)
        .then(function (response) {
            if (response.ok == true) {
                logoffData = response.json();     //转化为json
                // console.log(isLoginData);
                // console.log(token);
           }
            else {
                console.log("Something Wrong in Logoff TAT");
            }
        }
    )
    logoffData.then(result => {
        if (result.errorMsg == null) {
            alert("成功注销您的账号");
            window.location.href = "index.html";
        }
        else {
            console.log("Something Error in Logoff.errorMsg!");
            return; 
        }
    })
}