const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // 값을 바꿔야하기때문에 let을 쓴다.

function deleteToDo(event){ //HTML에서 ToDo를 지우는 이벤트(하지만 데이터는 남아있다.)
    const btn = event.target; //target은 이벤트가 정확이 어떤 버튼에서 작동했는지 파악
    const li = btn.parentNode;
    toDoList.removeChild(li); //toDoList에 있는 li 차일드를 지운다.

    //데이터 자체를 지우는 코드
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //parseInt로 스트링을 int로 바꾸기
    }); //필터란 array의 함수 실행 후 참인 아이템만 가지고 새로운 array를 만든다.
    toDos = cleanToDos //toDos를 한번 지워준다
    saveToDos(); //지운걸 다시 세이브
}

function saveToDos(){ //호출이 필요
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //로컬스로티지는 JS의 data 저장 못함!! 오로지 string만 가능하다
    //이를 위해 JSON.stringify 사용하면 오브젝트를 스트링으로 바꿀 수 있다.
}

function paintToDo(text){ //리스트 꾸미기
    const li = document.createElement("li"); //표 만듬
    const delBtn = document.createElement("button"); //버튼 만듬
    const span = document.createElement("span"); //span 만듬
    const newId = toDos.length + 1; //일정 입력 마다 값 +1
    delBtn.innerText = '❌'; //버튼안에 문구
    delBtn.addEventListener("click", deleteToDo); //삭제버튼 클릭 시 딜리트투두 이벤트 실행
    span.innerText = text; //span안에 들어갈 값
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; //일정을 입력 마다 id추가
    toDoList.appendChild(li);
    const toDoObj = {
        text :text,
        id : newId
    };
    toDos.push(toDoObj); //toDos에 toDoObj값을 하나씩 넣는다.
    saveToDos(); //푸쉬 먼저 후 호출하자
}

function handleSubmit(event){ //submit 말생시
    event.preventDefault();
    const currentValue = toDoInput.value; //현재값은 todoinput값을 가져온다.
    paintToDo(currentValue); //리스트 꾸미기 실행
    toDoInput.value="";
}

function something(){
    console.log(todDo.text)
}

function loadToDos(){ //리스트를 저장한다.
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos); //스트링을 오브젝트로 변환
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }); //forEach란 array에 담긴 값 각각에 한번씩 함수를 실행시켜줌
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();