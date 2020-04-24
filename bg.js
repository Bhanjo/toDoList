const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`
    image.classList.add("bgImage")
    body.prepend(image);
}

function getRandom(){
    const number = Math.floor(Math.random()*3); //floor : 소수점 아래 버림, random() * 3 : 0~2까지 3개만 랜덤출력
    return number;
}

function init(){
    const randomNumber = getRandom(); 
    paintImage(randomNumber);
}
init();