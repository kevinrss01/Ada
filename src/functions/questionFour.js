import { askQuestionToOpenAi } from "./ApiCall";
export const questionFour = async (input) => {
  const questionToAskToOpenAi = `Based on my main goal, give me a plan to help me to achieve my goal this year.<br/> Here is my goal : ${input}. And please skip a line after each advice with html br.`;
  const adaResponse = await askQuestionToOpenAi(questionToAskToOpenAi);
  return await adaResponse.choices[0].text;
};
