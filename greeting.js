const form = document.querySelector(".js-form");
const input = document.querySelector("input"); //쿼리 셀렉터는 찾은 첫번째꺼를 가져온다.
const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){ //이름을 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){ //이름을 입력 시 동작
    event.preventDefault(); //이름 입력 후 입력값이 사라지는걸 방지한다.
    const currentValue = input.value; //현재 값은 input값을 가져온다.
    paintGreeting(currentValue); //입력시 페인트그리팅이 실행된다.
    saveName(currentValue); //입력시 이름을 저정한다.
}

function askForName(){ //폼을 보여준다.
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) { //폼을 사라지게 하고 js-greetings를 표시한 후 거기에 innerText를 실행한다.
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){ //로컬스토리지에 유저이름 저장
    const currentUser = localStorage.getItem(USER_LS); //로컬스토리지는 특정한 값을 저장한다.
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();