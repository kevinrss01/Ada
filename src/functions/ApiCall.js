export const apiFunction = (data, questionNumber) => {
  let beforeSentence = "";
  let afterSentence = "";
  const insertHTML = (dataToInsert) => {
    const containerMessage = document.querySelector(".messagesContainer");
    containerMessage.insertAdjacentHTML(
      "beforeend",
      `<div class="fromAdaContainer">
             <p class="from-ada"> ${
               beforeSentence + dataToInsert + afterSentence
             }</p>
          </div>`
    );
  };

  async function askQuestionToOpenAi(prompt) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "text-curie-001",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ["."],
      }),
    });

    return response.json();
  }

  let questionToAskToOpenIa;

  switch (questionNumber) {
    case "1":
      let introduction;
      function sayHello(name) {
        if (localStorage.language === "fr") {
          introduction = "Ravi de te rencontrer ";
          questionToAskToOpenIa = `Donnez-moi un fait universel intéressant au sujet du nom ${data} en une phrase qui commence par ${data}`;
        } else {
          introduction = "Nice to meet you ";
          questionToAskToOpenIa = `Give me an interesting fact about the name ${data} in one sentence and that starts with ${data}.`;
        }
        const introductionSentence = `${introduction + name} !`;
        insertHTML(introductionSentence);
      }
      sayHello(data);

      askQuestionToOpenAi(questionToAskToOpenIa).then((res) => {
        const data = res.choices[0].text;
        beforeSentence = "Savais tu que ";
        afterSentence = " ?";
        insertHTML(data);
      });
      break;
    default:
      console.error("No question number found");
  }
};
