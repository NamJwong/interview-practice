const tabBtn1 = document.querySelector("#tab-btn-1");
const tabBtn2 = document.querySelector("#tab-btn-2");
const questionBox1 = document.querySelector("#question-box-1");
const questionBox2 = document.querySelector("#question-box-2");
const questionForm1 = document.querySelector("#question-box-1 Form");
const questionForm2 = document.querySelector("#question-box-2 Form");
const questionInput1 = questionForm1.querySelector("Input");
const questionInput2 = questionForm2.querySelector("Input");
const questionList1 = document.querySelector("#question-list-1");
const questionList2 = document.querySelector("#question-list-2");

const questions1 = [];
const questions2 = [];
const QUESTIONS_KEY1 = "questions1";
const QUESTIONS_KEY2 = "questions2";

const currentTabInfo = 
  {
    input: questionInput1,
    questions: questions1,
    key: QUESTIONS_KEY1,
    list: questionList1
  }



function updateCurrentTabInfo(tabNum) {
  if(tabNum === 1) {
    currentTabInfo.input = questionInput1;
    currentTabInfo.questions = questions1;
    currentTabInfo.key = QUESTIONS_KEY1;
    currentTabInfo.list = questionList1;
  }else {
    currentTabInfo.input = questionInput2;
    currentTabInfo.questions = questions2;
    currentTabInfo.key = QUESTIONS_KEY2;
    currentTabInfo.list = questionList2;
  }
}

function onClickTabBtn(event) {
  if(event.target.classList.contains("tab-unselected")) {
    questionBox1.classList.toggle("hidden");
    questionBox2.classList.toggle("hidden");
    tabBtn1.classList.toggle("tab-selected");
    tabBtn2.classList.toggle("tab-selected");
    tabBtn1.classList.toggle("tab-unselected");
    tabBtn2.classList.toggle("tab-unselected");
    if(event.target.id === "tab-btn-1") {
      updateCurrentTabInfo(1);
    }else {
      updateCurrentTabInfo(2);
    }
  }
}

tabBtn1.addEventListener("click", onClickTabBtn);
tabBtn2.addEventListener("click", onClickTabBtn);