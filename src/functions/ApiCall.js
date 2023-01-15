import { questionOne } from "./questionOne";
import { questionTwo } from "./questionTwo";
import { questionThree } from "./questionThree";

export async function askQuestionToOpenAi(prompt, stopValue) {
  let stopCaractere = "µπ";
  if (stopValue) {
    stopCaractere = stopValue;
  }

  const body = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: [stopCaractere],
  });

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: body,
  });

  return response.json();
}

export const deleteUselessWordInInput = (userInput) => {
  const wordToDeleteInInput = ["i", "am", "do", "doing"];

  //lowerCase
  //Split input word into an array
  //Return a new string which doesn't contain words to avoid
  userInput = userInput.toLowerCase();
  userInput = userInput
    .split(" ")
    .filter((word) => !wordToDeleteInInput.includes(word))
    .join(" ");

  return userInput;
};

export const questionFunction = async (input, questionNumber) => {
  //Clean the input to ask a good question to chatGPT

  let adaAnswerCleaned = "";
  let userName;

  switch (questionNumber) {
    case 1:
      adaAnswerCleaned = await questionOne(input);
      break;
    case 2:
      adaAnswerCleaned = await questionTwo(input);
      break;
    case 3:
      adaAnswerCleaned = await questionThree(input);
      break;
    default:
      throw new Error("Incorrect number question !");
  }
  return adaAnswerCleaned;
};
