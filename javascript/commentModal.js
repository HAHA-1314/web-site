//一级评论
var discussbtn = document.querySelector('.discuss-login');

var discussarea = document.querySelector('.discuss-input');

var discussinput = document.querySelector('.discuss-area');

var discussSubmitBtn = document.querySelector('.submit-discuss');

var discussSubmitZone = document.querySelector('.discuss-input-zone');

var discussSubmitLength = document.querySelector('.discuss-textcount');

var discussBox = document.querySelector('.discuss-box')

var discussContent;     //JS生成元素变量
var discussInfo;
var discussInfoAvatar;
var discussInfoName;
var discussInfoTime;
var discussText;
var discussBottomBanner;
var discussLikeBtn;
var discussNotlike;
var discussLiked;
var discussNotlikeImg;
var discussLikedImg;
var discussLikeCount;
var discussEdit;
var discussEditImg;
var discussEditText;
var discussDelete;
var discussDeleteImg;
var discussDeleteText;
var discussLowerBanner;
var discussLowerBtn;
var discussLowerCount;
var discussLowerArea;
var discussLowerInputZone;  //修改评论 发布二级评论
var discussLowerInputBottom;
var discussLowerInputText;
var discussLowerSubmitBtn;

//二级评论
var discussLowerSubmitBtn = document.querySelectorAll('.submit-lower-discuss');

var discussLowerSubmitZone = document.querySelectorAll('.discuss-lower-input-zone');

var discussLowerSubmitLength = document.querySelectorAll('.discuss-lower-textcount');

var discussLowerarea = document.querySelectorAll('.discuss-lower-area');

var discussLowerBtn = document.querySelectorAll('.discuss-lower-btn');

var discussLower;   //JS生成元素变量
var discussRow;
var discussLowerName;
var discussLowerSpanName;
var discussLowerSpanTime;
var discussLowerContent;

var discussCount = 0; //一级评论数量
var discussLikeArray = new Array(); //一级评论like数组
var discussArray = new Array(); //一级评论ID数组

discussarea.addEventListener('click', discussFunction);
discussbtn.addEventListener('click', discussFunction);
discussSubmitZone.addEventListener('input', detectSubmit);
discussSubmitZone.addEventListener('focus', detectSubmit);
// discussSubmitBtn.addEventListener('click', function () { discussSubmit(null) });

function discussisLogined() {
    if (isLogined == 1) {
        // discussbtn.style.display = 'none';
        discussbtn.innerHTML = '发表您的看法';
        discussbtn.style.backgroundColor = 'rgb(48, 47, 47)';
        discussbtn.style.color = '#d8dad3';
    }
    else {

    }
}

function discussFunction() {
    if (isLogined == 1) {
        discussarea.style.display = 'none';
        discussinput.style.display = 'inline-block';
    }
    else {
        alert('未登录！');
    }
}

function detectSubmit() {
    if (!discussSubmitZone.value.length) {
        discussSubmitBtn.style.backgroundColor = '#808281';
        discussSubmitBtn.style.cursor = 'default';
    }
    else {
        discussSubmitBtn.style.backgroundColor = '#4397f7';
        discussSubmitBtn.style.cursor = 'pointer';
    }
    discussSubmitLength.innerHTML = discussSubmitZone.value.length + '/200';
    discussSubmitBtn.onclick = function () {
        if (!discussSubmitZone.value.length) {
            return;
        }
        else {
            discussSubmit(null);
        }
    }
}

function detectLowerSubmit(x) {
    if (!discussLowerInputZone[x].value.length) {
        discussLowerSubmitBtn[x].style.backgroundColor = '#808281';
        discussLowerSubmitBtn[x].style.cursor = 'default';
    }
    else {
        discussLowerSubmitBtn[x].style.backgroundColor = '#4397f7';
        discussLowerSubmitBtn[x].style.cursor = 'pointer';
    }
    discussLowerInputText[x + 1].innerHTML = discussLowerInputZone[x].value.length + '/200';
}

async function discussSubmit(fatherId) {
    // console.log(videoid);
    // console.log(fatherId);
    var submit_body = {
        'fatherId': fatherId,
        'content': discussSubmitZone.value,
        'episodeId': episodeNid
    };
    myHeaders.append("Content-type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(submit_body),
    };
    var urlDiscuss = url + '/talk';
    var Data;
    await fetch(urlDiscuss, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  discussSubmit()");
            }
        })
    Data.then(result => {
        if (result.data == '添加成功') {
            alert('成功发布');
            location.reload();
            // discussCount++;
            // loadFatherDiscuss();
        }
    })
    // console.log('episodeid', episodeNid);
    // console.log('submit value', discussSubmitZone.value);
}

async function loadChirendDiscuss(talkId) {
    var urlCount = url + '/talk/children' + "?talkId=" + talkId;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    await fetch(urlCount, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in loadChilden()");
            }
        })
    Data.then(async function (result) {
        if (result.data.children.length == 0) return;
        // console.log(talkId);
        discussLower = document.createElement('div');
        discussLower.setAttribute('class', 'lower-discuss');
        discussContent.appendChild(discussLower);
        for (let x = 0; x < result.data.children.length; x++) {
            discussRow = document.createElement('div');
            discussLowerName = document.createElement('div');
            discussLowerSpanName = document.createElement('span');
            discussLowerSpanTime = document.createElement('span');
            discusslowerSpanEdit = document.createElement('span');
            discusslowerSpanEditImg = document.createElement('img');
            discusslowerSpanDelete = document.createElement('span');
            discusslowerSpanDeleteImg = document.createElement('img');  //占位符
            discussLowerContent = document.createElement('div');
            discussLowerName.setAttribute('class', 'lower-discuss-name');
            discussLowerSpanTime.setAttribute('class', 'lower-time');
            discussLowerContent.setAttribute('class', 'lower-discuss-content');
            discussLowerSpanName.innerHTML = result.data.children[x].userInfo.username;
            discussLowerSpanTime.innerHTML = result.data.children[x].createdTime;
            discussLowerContent.innerHTML = result.data.children[x].content;
            discussLower.appendChild(discussRow);
            discussRow.appendChild(discussLowerName);
            discussLowerName.appendChild(discussLowerSpanName);
            discussLowerName.appendChild(discussLowerSpanTime);
            discussRow.appendChild(discussLowerContent);
            discussLowerCount.innerHTML = result.data.children.length;
        }
    })
}

async function loadFatherDiscuss() {
    var urlCount = url + '/talk' + "?episodeId=" + episodeNid;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        'Content-Type': "application/json",
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        mode: "cors",
    };
    var Data;
    await fetch(urlCount, requestOptions)
        .then(response => {
            if (response.ok) {
                Data = response.json();
            }
            else {
                alert("Something error in  videoCount()");
            }
        })
    Data.then(async function (result) {
        discussArray.length = 0;    //防止旧数据依旧存在
        discussLikeArray.length = 0;
        discussCount = result.data.length;
        for (let x = 0; x < result.data.length; x++) {
            // console.log('await',result.data[x].id);
            await loadChirendDiscuss(result.data[x].id);        //完成一次then后执行
            discussArray[x] = result.data[x].id;
            discussLikeArray[x] = (result.data[x].isLike == 0) ? true : false;
            discussContent = document.createElement('div');
            discussInfo = document.createElement('div');
            discussInfoAvatar = document.createElement('img');
            discussInfoName = document.createElement('span');
            discussInfoTime = document.createElement('span');
            discussText = document.createElement('div');
            discussBottomBanner = document.createElement('div');
            discussLikeBtn = document.createElement('span');
            discussLiked = document.createElement('span');
            discussNotlike = document.createElement('span');
            discussLikedImg = document.createElement('img');
            discussNotlikeImg = document.createElement('img');
            discussLikeCount = document.createElement('span');
            discussLowerBanner = document.createElement('span');
            discussLowerBtn = document.createElement('img');
            discussLowerCount = document.createElement('span');
            discussLowerArea = document.createElement('div');
            discussLowerInputZone = document.createElement('textarea');
            discussLowerInputBottom = document.createElement('div');
            discussLowerInputText = document.createElement('span');
            discussLowerSubmitBtn = document.createElement('button');
            discussContent.setAttribute('class', 'discuss-content');
            discussInfo.setAttribute('class', 'discuss-info');
            discussInfoAvatar.setAttribute('class', 'discuss-info-avatar');
            discussInfoName.setAttribute('class', 'discuss-info-name');
            discussInfoTime.setAttribute('class', 'discuss-info-time');
            discussText.setAttribute('class', 'discuss-text');
            discussBottomBanner.setAttribute('class', 'discuss-bottom-banner');
            discussLikeBtn.setAttribute('class', 'discuss-like-btn');
            discussNotlike.setAttribute('class', 'discuss-self-notlike');
            discussLiked.setAttribute('class', 'discuss-self-liked');
            discussLikedImg.setAttribute('src', 'icon/like.png');
            discussNotlikeImg.setAttribute('src', 'icon/liked.png');
            discussLikeCount.setAttribute('class', 'discuss-like-count');
            discussLowerBanner.setAttribute('class', 'discuss-lower-banner');
            discussLowerBtn.setAttribute('class', 'discuss-lower-btn');
            discussLowerBtn.setAttribute('src', 'icon/discuss-btn.png');
            discussLowerCount.setAttribute('class', 'discuss-lower-count');
            discussLowerArea.setAttribute('class', 'discuss-lower-area');
            discussLowerInputZone.setAttribute('type', 'text');
            discussLowerInputZone.setAttribute('class', 'discuss-lower-input-zone');
            discussLowerInputZone.setAttribute('maxlength', '200');
            discussLowerInputZone.setAttribute('minlength', '1');
            discussLowerInputZone.setAttribute('placeholder', '和谐评论，一同维护网络环境');
            discussLowerInputBottom.setAttribute('class', 'discuss-bottom');
            discussLowerInputText.setAttribute('class', 'discuss-textcount');
            discussLowerSubmitBtn.setAttribute('class', 'submit-lower-discuss');
            discussInfoName.innerHTML = result.data[x].userInfo.username;
            discussInfoTime.innerHTML = result.data[x].createdTime;
            discussInfoAvatar.setAttribute('src', result.data[x].userInfo.avatar);
            discussText.innerHTML = result.data[x].content;
            discussLikeCount.innerHTML = result.data[x].likeCount;
            discussLowerCount.innerHTML = '0';
            discussLowerSubmitBtn.innerHTML = "发布";
            discussBox.appendChild(discussContent);
            discussContent.appendChild(discussInfo);
            discussInfo.appendChild(discussInfoAvatar);
            discussInfo.appendChild(discussInfoName);
            discussInfo.appendChild(discussInfoTime);
            discussContent.appendChild(discussText);
            discussContent.appendChild(discussBottomBanner);
            discussBottomBanner.appendChild(discussLikeBtn);
            discussLikeBtn.appendChild(discussNotlikeImg);
            discussLikeBtn.appendChild(discussLikedImg);
            discussBottomBanner.appendChild(discussLikeCount);
            discussBottomBanner.appendChild(discussLowerBanner);
            discussLowerBanner.appendChild(discussLowerBtn);
            discussLowerBanner.appendChild(discussLowerCount);
            if (result.data[x].isLike == false) {
                discussLikedImg.style.display = 'inline-block';
                discussNotlikeImg.style.display = 'none';
            }
            else {
                discussLikedImg.style.display = 'none';
                discussNotlikeImg.style.display = 'inline-block';
            }
            discussEdit = document.createElement('span');
            discussEditImg = document.createElement('img');
            discussEditText = document.createElement('span');
            discussDelete = document.createElement('span');
            discussDeleteImg = document.createElement('img');
            discussDeleteText = document.createElement('span');
            discussEdit.setAttribute('class', 'discuss-edit');
            discussEditText.setAttribute('class', 'discuss-edit-text');
            discussDelete.setAttribute('class', 'discuss-delete');
            discussDeleteText.setAttribute('class', 'discuss-delete-text');
            discussEditText.innerHTML = '修改评论';
            discussDeleteText.innerHTML = '删除评论';
            discussEditImg.setAttribute('src', 'icon/edit-discuss.png');
            discussDeleteImg.setAttribute('src', 'icon/delete-dark.png');
            discussBottomBanner.appendChild(discussEdit);
            discussEdit.appendChild(discussEditImg);
            discussEdit.appendChild(discussEditText);
            discussBottomBanner.appendChild(discussDelete);
            discussDelete.appendChild(discussDeleteImg);
            discussDelete.appendChild(discussDeleteText);
            if (result.data[x].userId != userId) {
                discussDelete.style.display = 'none';
                discussEdit.style.display = 'none';
            }
            discussBottomBanner.appendChild(discussLowerArea);
            discussLowerArea.appendChild(discussLowerInputZone);
            discussLowerArea.appendChild(discussLowerInputBottom);
            discussLowerInputBottom.appendChild(discussLowerInputText);
            discussLowerInputBottom.appendChild(discussLowerSubmitBtn);
            discussLowerCount.querySelector('.discuss-lower-count');
        }
    })
        .then(() => {
            discussEdit = document.querySelectorAll('.discuss-edit');
            discussDelete = document.querySelectorAll('.discuss-delete');
            discussLikeBtn = document.querySelectorAll('.discuss-like-btn');
            discussLikeCount = document.querySelectorAll('.discuss-like-count');
            discussLowerBtn = document.querySelectorAll('.discuss-lower-btn');
            discussLowerBanner = document.querySelectorAll('.discuss-lower-banner');
            discussLowerArea = document.querySelectorAll('.discuss-lower-area');
            discussLowerInputZone = document.querySelectorAll('.discuss-lower-input-zone');
            discussLowerSubmitBtn = document.querySelectorAll(".submit-lower-discuss");
            discussLowerInputText = document.querySelectorAll('.discuss-textcount');
            for (let x = 0; x < discussArray.length; x++) {
                discussLowerInputZone[x].addEventListener('input', function () { detectLowerSubmit(x) });
                discussLowerInputZone[x].addEventListener('focus', function () { detectLowerSubmit(x) });
            }
            editDiscuss();
            likeDiscuss();
            deleteDiscuss();
            discussSubmitLower();
        })
}

function editDiscuss() {
    for (let x = 0; x < discussArray.length; x++) {
        discussEdit[x].onclick = function () {
            discussLowerInputZone[x].setAttribute('placeholder', '这里输入修改您的评论');
            discussLowerArea[x].style.display = "block";
            discussLowerSubmitBtn[x].innerHTML = "编辑";
            // console.log(x);
            discussLowerSubmitBtn[x].onclick = async function () {
                var urlCount = url + '/talk';
                var edit_body = {
                    'id': discussArray[x],
                    'content': discussLowerInputZone[x].value,
                };
                myHeaders.append("Content-type", "application/json");
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(edit_body),
                    'Content-Type': "application/json",
                    "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                    mode: "cors",
                };
                var Data;
                await fetch(urlCount, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            Data = response.json();
                        }
                        else {
                            alert("Something error in  editDiscuss()");
                        }
                    })
                Data.then(result => {
                    if (result.data == '修改成功') {
                        alert('修改成功');
                        location.reload();
                    }
                    else {
                        alert("something wrong TAT");
                    }
                })
            }
        }
    }
}

function deleteDiscuss() {
    for (let x = 0; x < discussArray.length; x++) {
        discussDelete[x].onclick = async function () {
            var urlCount = url + '/talk?talkId=' + discussArray[x];
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                'Content-Type': "application/json",
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                mode: "cors",
            };
            var Data;
            await fetch(urlCount, requestOptions)
                .then(response => {
                    if (response.ok) {
                        Data = response.json();
                    }
                    else {
                        alert("Something error in  videoCount()");
                    }
                })
            Data.then(result => {
                alert(result.data);
                clearDiscuss();
                loadFatherDiscuss();
            })
        }
    }
}

function likeDiscuss() {
    if (isLogined != 1) {
        alert('未登录！');
        return;
    }
    for (let x = 0; x < discussArray.length; x++) {
        discussLikeBtn[x].onclick = async function () {
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                mode: "cors",
            };
            var urlCount = url + '/talk/like?talkId=' + discussArray[x] + '&like=' + discussLikeArray[x];
            var Data;
            await fetch(urlCount, requestOptions)
                .then(response => {
                    if (response.ok) {
                        Data = response.json();
                    }
                    else {
                        alert("Something error in  videoLike()");
                    }
                })
            Data.then(result => {
                // discussLikeCount[x].innerHTML = discussLikeCount[x].innerHTML + 1;
                clearDiscuss();
                loadFatherDiscuss();
                alert(result.data);
            })
        }
    }
}

function discussSubmitLower() {
    for (let x = 0; x < discussArray.length; x++) {
        discussLowerBtn[x].onclick = async function () {
            console.log('?');
            discussLowerInputZone[x].setAttribute('placeholder', '和谐评论，一同维护网络环境');
            discussLowerArea[x].style.display = "block";
            discussLowerSubmitBtn[x].innerHTML = "发布";
            discussLowerSubmitBtn[x].onclick = async function () {
                var submit_body = {
                    'fatherId': discussArray[x],
                    'content': discussLowerInputZone[x].value,
                    'episodeId': episodeNid
                };
                myHeaders.append("Content-type", "application/json");
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(submit_body),
                };
                var urlDiscuss = url + '/talk';
                var Data;
                await fetch(urlDiscuss, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            Data = response.json();
                        }
                        else {
                            alert("Something error in  discussSubmit()");
                        }
                    })
                Data.then(result => {
                    if (result.data == '添加成功') {
                        alert('成功发布');
                        location.reload();
                    }
                })
            }
        }
    }
}

function clearDiscuss() {
    while (document.querySelector('.discuss-content') != null) discussBox.removeChild(document.querySelector('.discuss-content'));
}