import { askQuestionToOpenAi, deleteUselessWordInInput } from "./ApiCall";

export const questionTwo = async (input) => {
  const sentenceBeginning = "Oh that's interesting! ";

  const userJob = deleteUselessWordInInput(input);
  let questionToAskToOpenAi = `Just explain to me what it is to be ${userJob} `;
  const res = await askQuestionToOpenAi(questionToAskToOpenAi, ".");
  const adaResponse = res.choices[0].text;
  return `${sentenceBeginning}According to my knowledge ${adaResponse}.<br/> I guess being ${userJob} isn’t your only occupation, do you have hobbies or passions in life ?`;
};
