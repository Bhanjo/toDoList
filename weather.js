const weather = document.querySelector(".js-weather");
const API_KEY = "32b8e4da890340e0a613aaf1c83ebee0"; //AP키
const COORDS = "coords";

function getWeather(lat, lng){ //API호출
 fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
     ).then(function(response){ //then은 데이터가 전부 들어온 다음 호출한다.
        return response.json();
     }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}º @ 🌍${place}`;
     });
}

function saveCoords(coordsObj) { //
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) { //위도, 적도 가져옴
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj); //정보를 데이터로 저장
    getWeather(latitude, longitude); //경도, 위도 값을 getWeather로 보내기
}

function handleGeoErr() {
    console.log('로케이션 엑세스를 할 수 없습니다.');
}

function askForCoords() { //위치정보 가져오기(물어보기)
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErr)
}

function loadCoords() { //위치정보 유무 확인
    const loadedCoords = localStorage.getItem(COORDS); //위치정보 저장
    if (loadedCoords === null) { //위치정보가 없으면 위치정보를 가져온다.
        askForCoords();
    } else { //위치정보가 있으면 날씨API 를 호출한다.
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();