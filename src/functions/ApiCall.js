export const myAnswer = (answer) => {
  const containerMessage = document.querySelector(".messagesContainer");
  containerMessage.insertAdjacentHTML(
    "beforeend",
    `<div class="fromMeContainer">
             <p class="from-me">${answer}</p>
          </div>`
  );
};
export const nameQuestion = (name) => {
  const firstLetterCap = name[0].toUpperCase();
  const remainingLetters = name.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;

  const containerMessage = document.querySelector(".messagesContainer");
  containerMessage.insertAdjacentHTML(
    "beforeend",
    `<div class="fromAdaContainer">
             <p class="from-ada">Hello ${capitalizedWord} !</p>
          </div>`
  );
};
