import { questionOne } from "./questionOne";
import { questionTwo } from "./questionTwo";
import { questionThree } from "./questionThree";
import { questionFour } from "./questionFour";

export async function askQuestionToOpenAi(prompt, stopValue) {
  try {
    let stopCaractere = "µπ";
    if (stopValue) {
      stopCaractere = stopValue;
    }

    console.log(process.env.REACT_APP_OPENAI_API_KEY);

    const body = JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 420,
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
  } catch (error) {
    console.error(error);
    throw new Error("Error in askQuestionToOpenAi function");
  }
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

let userName;
let userJob;
export const questionFunction = async (input, questionNumber) => {
  if (!input) {
    throw new Error("Wrong Input");
  }
  let adaAnswerCleaned = "";

  switch (questionNumber) {
    case 1:
      userName = input;
      adaAnswerCleaned = await questionOne(input);
      break;
    case 2:
      userJob = input;
      adaAnswerCleaned = await questionTwo(input);
      break;
    case 3:
      adaAnswerCleaned = await questionThree(input, userName, userJob);
      break;
    case 4:
      adaAnswerCleaned = await questionFour(input);
      break;
    default:
      throw new Error("Incorrect number question !");
  }
  return adaAnswerCleaned;
};
