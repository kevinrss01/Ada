import { askQuestionToOpenAi } from "./ApiCall";
export const questionOne = async (input) => {
  let introductionSentence;
  let funFactAboutName;
  let userName;
  const createIntroduction = (name) => {
    const introduction = "Nice to meet you ";
    userName = name;
    return `${introduction + name} !<br/>`;
  };

  const createFunFactName = async (question) => {
    try {
      const res = await askQuestionToOpenAi(question, ".");
      const adaResponse = res.choices[0].text;
      const beforeSentence = "Did you know that ";
      const afterSentence = " ?" + "<br/>" + "<br>";
      return beforeSentence + adaResponse + afterSentence;
    } catch (error) {
      throw error;
    }
  };

  async function createAnswerOne(name) {
    try {
      introductionSentence = createIntroduction(name);
      const questionToAskToOpenAi = `Give me an interesting universal fact about the name ${name} in a sentence that begins with ${name}`;
      funFactAboutName = await createFunFactName(questionToAskToOpenAi);
      const questionAboutJob = `What do you do for a living ${name}?`;

      return introductionSentence + funFactAboutName + questionAboutJob;
    } catch (error) {
      console.error(error);
    }
  }

  return await createAnswerOne(input);
};
