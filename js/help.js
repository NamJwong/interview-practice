const helpBtn = document.querySelector("#help-button");
const help = document.querySelector("#help");
const helpList = document.querySelector("#help-list");

function onMouseEnterHelp() {
  helpList.classList.toggle("hidden");
  help.classList.add("background-shown");
}

function onMouseLeaveHelp() {
  helpList.classList.toggle("hidden");
  help.classList.remove("background-shown");
}

helpBtn.addEventListener("mouseenter", onMouseEnterHelp);
helpBtn.addEventListener("mouseleave", onMouseLeaveHelp);