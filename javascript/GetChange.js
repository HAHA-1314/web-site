var change_button = document.querySelector('.change-content');

var urlChange = url + "/video/random?size=4";

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
