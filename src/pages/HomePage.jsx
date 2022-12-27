import { BiSend } from "react-icons/bi";

import { myAnswer, nameQuestion } from "../functions/ApiCall";
import { useState } from "react";

export const HomePage = () => {
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = (input) => {
    myAnswer(input);
    setInput("");
    setTimeout(function () {
      nameQuestion(input);
    }, 1000);
  };

  return (
    <div className="homePageBody">
      <div className="chatContainer">
        <div className="messagesContainer">
          <div className="fromAdaContainer">
            <p className="from-ada">
              Bonjour ! <br />
              Je me présente, je suis <b>ADA</b> une intelligence artificielle
              créer pour simuler un être humain. Faisons connaissance, comment
              t'appelles-tu ?
            </p>
          </div>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            name="inputText"
            onChange={handleInput}
            value={input}
            maxLength={30}
            minLength={3}
            onKeyDown={(event) => {
              if (input.length > 2) {
                if (event.key === "Enter") {
                  onSubmit(input);
                }
              }
            }}
          />
          <div
            className="submitContainer"
            onClick={() => {
              if (input.length > 2) {
                onSubmit(input);
              }
            }}
          >
            <BiSend
              className={input.length > 2 ? "submitIcon" : "invalidSubmitIcon"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
