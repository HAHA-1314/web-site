async function joinVideo(episodeNid) {
    var urlCount = url + '/info/join' + "?id=" + episodeNid + "&time=" + "00:00:00";
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
}