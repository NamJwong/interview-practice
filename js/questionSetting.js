function saveQuestions() {
  localStorage.setItem(currentTabInfo.key, JSON.stringify(currentTabInfo.questions));
}

function deleteQuestion(event) {
  const li = event.target.parentElement;
  li.remove();
  currentTabInfo.questions = currentTabInfo.questions.filter((question) => question.id !== parseInt(li.id));
  saveQuestions();
}

function paintQuestion(newQuestion) {
  const li = document.createElement("li");
  li.id = newQuestion.id
  const span = document.createElement("span");
  span.innerText = newQuestion.text;
  const button = document.createElement("button");
  button.style.backgroundColor = "transparent";
  button.style.border = "none";
  button.innerText = "❌";
  button.addEventListener("click", deleteQuestion);
  li.appendChild(span);
  li.appendChild(button);
  currentTabInfo.list.appendChild(li);
}

function handleQeustionSubmit(event) {
  event.preventDefault();
  const newQuestion = currentTabInfo.input.value;
  currentTabInfo.input.value = "";
  const newQuestionObj = {
    text: newQuestion,
    id: Date.now()
  }
  currentTabInfo.questions.push(newQuestionObj);
  paintQuestion(newQuestionObj);
  saveQuestions();
}

function initQuestions(savedQuestions) {
  if(savedQuestions) {
    const parsedQuestions = JSON.parse(savedQuestions);
    currentTabInfo.questions = parsedQuestions;
    currentTabInfo.questions.forEach(paintQuestion);
  }
}

questionForm1.addEventListener("submit", handleQeustionSubmit);
questionForm2.addEventListener("submit", handleQeustionSubmit);

const savedQuestions1 = localStorage.getItem(QUESTIONS_KEY1);
const savedQuestions2 = localStorage.getItem(QUESTIONS_KEY2);

initQuestions(savedQuestions1);
updateCurrentTabInfo(2);
initQuestions(savedQuestions2);
updateCurrentTabInfo(1);