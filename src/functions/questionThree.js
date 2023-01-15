import { askQuestionToOpenAi } from "./ApiCall";

export const questionThree = async (input) => {
  const endSentence = `You’re lucky, personally I was designed not to have any preference...`;
  const userHobbies = input;

  let questionToAskToOpenAi = `Make an assumption about my person based on these or that passion : ${userHobbies}.`;
  const adaResponse = await askQuestionToOpenAi(questionToAskToOpenAi);
  return `Based on the information I have here is a brief summary I made about you :<br/><br/>${adaResponse.choices[0].text}.<br/> ${endSentence}`;
};
