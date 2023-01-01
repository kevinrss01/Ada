export const apiFunction = async (input, questionNumber) => {
  async function translateFrToEn(textToTranslate) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("from", "fr");
    encodedParams.append("to", "en");
    encodedParams.append("text", textToTranslate);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_TRANSLO_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_TRANSLO_URL_HOST,
      },
      body: encodedParams,
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_TRANSLO_URL_API,
        options
      );
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function askQuestionToOpenAi(prompt) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    });

    return response.json();
  }

  //Clean the input to ask a good question to chatGPT
  const deleteUselessWordInInput = (userInput) => {
    const wordToDeleteInInput = [
      "je",
      "suis",
      "i",
      "am",
      "en",
      "train",
      "do",
      "doing",
      "j'ai",
      "fait",
      "fais",
    ];

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

  let questionToAskToOpenAi;
  let adaAnswerCleaned = "";
  let userName;

  switch (questionNumber) {
    case 1:
      let introductionSentence;
      let funFactAboutName;
      const createIntroduction = (name) => {
        const introduction = "Ravi de te rencontrer ";
        userName = name;
        return `${introduction + name} !<br/>`;
      };

      const createFunFactName = async (question) => {
        try {
          const res = await askQuestionToOpenAi(question);
          const adaResponse = res.choices[0].text;
          const beforeSentence = "Savais-tu que ";
          const afterSentence = " ?" + "<br/>" + "<br>";
          return beforeSentence + adaResponse + afterSentence;
        } catch (error) {
          console.error(error);
        }
      };

      async function createAnswerOne(name) {
        try {
          introductionSentence = createIntroduction(name);
          questionToAskToOpenAi = `Donne-moi un fait universel intéressant au sujet du nom ${name} en une phrase qui commence par ${name}`;
          funFactAboutName = await createFunFactName(questionToAskToOpenAi);
          const questionAboutJob = `Est-ce que je peux te demander ce que tu fais dans la vie ${name} ?`;

          return introductionSentence + funFactAboutName + questionAboutJob;
        } catch (error) {
          console.error(error);
        }
      }

      adaAnswerCleaned = await createAnswerOne(input);
      //If the language user is english
      if (localStorage.language === "en") {
        const englishTraduction = await translateFrToEn(adaAnswerCleaned);
        adaAnswerCleaned = englishTraduction.translated_text;
      }

      break;
    case 2:
      if (input) {
        const sentenceBeginning = "Oh intéressant ! ";

        const userJob = deleteUselessWordInInput(input);
        questionToAskToOpenAi = `Explique moi simplement ce qu'est être ${userJob} `;
        const res = await askQuestionToOpenAi(questionToAskToOpenAi);
        const adaResponse = res.choices[0].text;
        adaAnswerCleaned = `${sentenceBeginning}D'après mes connaissances ${adaResponse}.<br/> J'imagine qu'être ${userJob} n'est pas ta seule occupation, as-tu des hobbies ou des passions dans la vie ?`;

        if (localStorage.language === "en") {
          const englishTraduction = await translateFrToEn(adaAnswerCleaned);
          adaAnswerCleaned = englishTraduction.translated_text;
        }
      }

      break;
    case 3:
      if (input) {
        const endSentence = `Tu en as de la chance, personnellement j'ai été conçu pour ne pas avoir de préférence...`;
        const userHobbies = input;

        questionToAskToOpenAi = `Fais une supposition sur ma personne en fonction de ces passions : ${userHobbies}`;
        const adaResponse = await askQuestionToOpenAi(questionToAskToOpenAi);
        adaAnswerCleaned = `En fonction des informations que j'ai voici un petit résumé que j'ai fait sur toi :<br/><br/>${adaResponse.choices[0].text}.<br/> ${endSentence}`;

        if (localStorage.language === "en") {
          const englishTraduction = await translateFrToEn(adaAnswerCleaned);
          adaAnswerCleaned = englishTraduction.translated_text;
        }
      }

      break;
    default:
      console.error("No question number found");
  }
  return adaAnswerCleaned;
};
