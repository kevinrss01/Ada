import { askQuestionToOpenAi } from "./ApiCall";

export const questionThree = async (input, name, userJob) => {
  const endSentence = `You’re lucky, personally I was designed not to have any preference...`;
  const userHobbies = input;

  let questionToAskToOpenAi = `Make an assumption about my person based on these or that passion : ${userHobbies}, and my job : ${userJob}`;
  const adaResponse = await askQuestionToOpenAi(questionToAskToOpenAi);
  return `Based on the information I have ${name}, here is a brief summary I made about you :<br/><br/>${adaResponse.choices[0].text}.<br/> ${endSentence}<br/><br/> You know what ? I can help you. Tell me what is you more important goal this year, and I'll give a plan to reach this goal.`;
};
