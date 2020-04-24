//라이브 시간 표시 코드

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date(); //데이트 객체를 선언한다.

    //시, 분, 초를 가져온다.
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = 
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    // ${seconds < 10 ? `0${seconds}` : seconds} if문을 간략화 한 것임.
    // 만약 초가 10 이하일 시 앞에 0을 붙이고 10 이상이면 그냥 출력한다.

}
function init(){ //시간 불러오기
    getTime();

    //이 함수는 해당 function을 n초마다 반복하는 함수임
    setInterval(getTime, 1000); //getTime이라는 function을 1000 밀리초마다 반복실행한다.
}
init();