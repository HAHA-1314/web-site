var change_button = document.querySelector('.change-content');

var pic_1_1 = document.querySelector('#pic-1-1');

var name_1_1 = document.querySelector('#name-1-1');

var description_1_1 = document.querySelector('#description-1-1');

var pic_1_2 = document.querySelector('#pic-1-2');

var name_1_2 = document.querySelector('#name-1-2');

var description_1_2 = document.querySelector('#description-1-2');

var pic_1_3 = document.querySelector('#pic-1-3');

var name_1_3 = document.querySelector('#name-1-3');

var description_1_3 = document.querySelector('#description-1-3');

var pic_1_4 = document.querySelector('#pic-1-4');

var name_1_4 = document.querySelector('#name-1-4');

var description_1_4 = document.querySelector('#description-1-4');

var pic_1_5 = document.querySelector('#pic-1-5');

var name_1_5 = document.querySelector('#name-1-5');

var description_1_5 = document.querySelector('#description-1-5');

var pic_1_6 = document.querySelector('#pic-1-6');

var name_1_6 = document.querySelector('#name-1-6');

var description_1_6 = document.querySelector('#description-1-6');

var urlChange = url + "/video/random?size=6";

//暂时只更改第一行,size大小限制 

change_button.onclick = async function changeFirstline () {
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
        pic_1_1.setAttribute('src', result.data[0].cover);
        name_1_1.innerHTML = result.data[0].name;
        description_1_1.innerHTML = result.data[0].brief;
        pic_1_2.setAttribute('src', result.data[1].cover);
        name_1_2.innerHTML = result.data[1].name;
        description_1_2.innerHTML = result.data[1].brief;
        pic_1_3.setAttribute('src', result.data[2].cover);
        name_1_3.innerHTML = result.data[2].name;
        description_1_3.innerHTML = result.data[2].brief;
        pic_1_4.setAttribute('src', result.data[3].cover);
        name_1_4.innerHTML = result.data[3].name;
        description_1_4.innerHTML = result.data[3].brief;
        pic_1_5.setAttribute('src', result.data[4].cover);
        name_1_5.innerHTML = result.data[4].name;
        description_1_5.innerHTML = result.data[4].brief;
        pic_1_6.setAttribute('src', result.data[5].cover);
        name_1_6.innerHTML = result.data[5].name;
        description_1_6.innerHTML = result.data[5].brief;
    })
}
change_button.click(); //首先执行一次
