const question = document.querySelector("#interview-box h3");
const questionNumDiv = document.querySelector("#interview-box div");
const nextBtn = document.querySelector("#interview-box button");
const interview1Btn = document.querySelector("#btn-interview1");
const interview2Btn = document.querySelector("#btn-interview2");
const interviewAllBtn = document.querySelector("#btn-interview-all");
const interviewTitle = document.querySelector("#interview-box h1");
const nextInterviewBtn = document.querySelector("#btn-next-interview");

const basicQuestions = [
  "자기소개 부탁드립니다.",
  "지원 동기가 무엇인가요?",
  "마지막으로 할 말 있으신가요?"
]
const interviewInfo = {
  questionNum: 0,
  type: 0,
  currentQustionsNum: 0
}

function getRadioValue(name) {
  for(let i = 0; i < 3; i++) {
    if(document.getElementsByName(name)[i].checked === true) {
      return document.getElementsByName(name)[i].value;
    }
  }
}

function setSetting() {
  interviewInfo.setting = [
    [
      getRadioValue("selfIntroduction1"),
      getRadioValue("applicationReason1"),
      getRadioValue("finalTalk1")
    ],
    [
      getRadioValue("selfIntroduction2"),
      getRadioValue("applicationReason2"),
      getRadioValue("finalTalk2")
    ]
  ];
}

function basicQuestionYN(value) {
  if(value === "0")
    return true;
  if(value === "1")
    return false;
  const randomYN = Math.floor(Math.random() * 2);
  if(randomYN === 1) {
    return true;
  }else {
    return false;
  }
}


function setBasicQuesitons() {
  const basicQuestionsArr = [];
  for(let i = 0; i < 2; i++) {
    const selectedBasicQuestions = [];
    const setting = interviewInfo.setting[i];
    for(let j = 0; j < 3; j++) {
      if(basicQuestionYN(setting[j])){
        selectedBasicQuestions.push(basicQuestions[j]);
      }
    }
    basicQuestionsArr.push(selectedBasicQuestions);
  }
  interviewInfo.basicQuestionsArr = basicQuestionsArr;
}

function selectQuestion(questions, questionsLength) {
  const selectedQuestions = [];
  while(selectedQuestions.length < questionsLength) {
    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
    if(selectedQuestions.includes(selectedQuestion)) {
      continue;
    }
    selectedQuestions.push(selectedQuestion);
  }
  return selectedQuestions;
}

function getSelectedQuestions(questions, basicQuestionsParam) {
  let selectedQuestions = [];
  if((questions.length + basicQuestionsParam.length) < 6) {
    selectedQuestions = selectQuestion(questions, questions.length); 
  }else {
    selectedQuestions = selectQuestion(questions, 6-basicQuestionsParam.length); 
  }
  if(basicQuestionsParam[basicQuestionsParam.length-1] === basicQuestions[2]) {
    selectedQuestions.push(basicQuestionsParam.pop());
  }
  while(basicQuestionsParam.length !== 0) {
    selectedQuestions.unshift(basicQuestionsParam.pop());
  }
  return selectedQuestions;
}

function getQuestionsFromQuestionObjs(questionObjs) {
  const questions = [];
  if(questionObjs === null) {
    return null;
  }
  for(let i = 0; i < questionObjs.length; i++) {
    questions.push(questionObjs[i].text);
  }
  return questions;
}

function setInterviewQuestions() {
  const questionObjs1 = JSON.parse(localStorage.getItem("questions1"));
  const questionObjs2 = JSON.parse(localStorage.getItem("questions2"));
  const questions1 = getQuestionsFromQuestionObjs(questionObjs1);
  const questions2 = getQuestionsFromQuestionObjs(questionObjs2);
  if(questionsIsNull(questions1, questions2)) return true;
  if(interviewInfo.type === 0) {
    interviewInfo.questionsArr = [getSelectedQuestions(questions1, interviewInfo.basicQuestionsArr[0]), []];
  }else if(interviewInfo.type === 1) {
    interviewInfo.questionsArr = [[], getSelectedQuestions(questions2, interviewInfo.basicQuestionsArr[1])];
  }else {
    interviewInfo.questionsArr = [getSelectedQuestions(questions1, interviewInfo.basicQuestionsArr[0]), getSelectedQuestions(questions2, interviewInfo.basicQuestionsArr[1])];
  }
  return false;
}

function questionsIsNull(questions1, questions2) {
  if(interviewInfo.type === 0) {
    if((questions1 === null) || (questions1.length === 0)) {
      alert("면접 1의 질문이 비었습니다!");
      return true;
    }
  }else if(interviewInfo.type === 1) {
    if((questions2 === null) || (questions2.length === 0)) {
      alert("면접 2의 질문이 비었습니다!");
      return true;
    }
  }else{
    if((questions1 === null || questions1.length === 0) && (questions2 === null || questions2.length === 0)) {
      alert("면접 1과 2의 질문이 비었습니다!");
      return true;
    }else if((questions1 === null) || (questions1.length === 0)) {
      alert("면접 1의 질문이 비었습니다!");
      return true;
    }else if((questions2 === null) || (questions2.length === 0)) {
      alert("면접 2의 질문이 비었습니다!");
      return true;
    }

  }
  return false;
}

function setFirstQuestion(questions) {
  interviewInfo.questionNum ++;
  question.innerText = `${interviewInfo.questionNum}. ${questions[0]}`;
  // questionNumDiv.innerText = `1/${questions.length}`;
}

function setCurrentQuestionsNum() {
  if(interviewInfo.type === 1) {
    interviewInfo.currentQustionsNum = 1;
  }else {
    interviewInfo.currentQustionsNum = 0;
  }
}

function paintEnding() {
  document.querySelector("#interview-box").classList.toggle("hidden");
  document.querySelector("#interview-ending").classList.toggle("hidden");
}

function onClickNextInterviewBtn() {
  interviewInfo.currentQustionsNum = 1;
  nextInterviewBtn.classList.toggle("hidden");
  document.querySelector("#interview-box").classList.toggle("hidden");
  setFirstQuestion(interviewInfo.questionsArr[interviewInfo.currentQustionsNum]);
}

function endInterview() {
  if(interviewInfo.type === 2) {
    if(interviewInfo.currentQustionsNum === 1) {
      alert("모든 면접이 끝났습니다!");
      paintEnding();
    }else {
      interviewInfo.currentQustionsNum = 1;
      interviewInfo.questionNum = 0;
      interviewTitle.innerText = `면접 ${interviewInfo.currentQustionsNum+1}`;
      document.querySelector("#interview-box").classList.toggle("hidden");
      nextInterviewBtn.classList.toggle("hidden");
      nextInterviewBtn.addEventListener("click", onClickNextInterviewBtn);
    }
  }else {
    alert("면접이 끝났습니다!");
      paintEnding();
  }
}

function onCilckNextButton() {
  interviewInfo.questionNum ++;
  const questions = interviewInfo.questionsArr[interviewInfo.currentQustionsNum];
  if(interviewInfo.questionNum > questions.length) {
    endInterview()
    return;
  }
  question.innerText = `${interviewInfo.questionNum}. ${questions[interviewInfo.questionNum-1]}`;
  // questionNumDiv.innerText = `${interviewInfo.questionNum}/${questions.length}`;
}

function paintInterview() {
  document.querySelector("#interview-setting").classList.toggle("hidden");
  document.querySelector("#interview").classList.toggle("hidden");
  setFirstQuestion(interviewInfo.questionsArr[interviewInfo.currentQustionsNum]);
  nextBtn.addEventListener("click", onCilckNextButton);
}

function onCilckStartInterviewBtn(event) {
  const id = event.target.id;
  if(id === "btn-interview1") {
    interviewInfo.type = 0;
  }else if(id === "btn-interview2") {
    interviewInfo.type = 1;
  }else {
    interviewInfo.type = 2;
  }
  setSetting();
  setBasicQuesitons()
  setCurrentQuestionsNum();
  if(setInterviewQuestions()) return;
  paintInterview();
  interviewTitle.innerText = `면접 ${interviewInfo.currentQustionsNum+1}`;
}

interview1Btn.addEventListener("click", onCilckStartInterviewBtn);
interview2Btn.addEventListener("click", onCilckStartInterviewBtn);
interviewAllBtn.addEventListener("click", onCilckStartInterviewBtn);