import { BiSend } from "react-icons/bi";

import { apiFunction } from "../functions/ApiCall";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export const HomePage = () => {
  const [language, setLanguage] = useState("en");
  const [isLanguageChosen, setIsLanguageChosen] = useState(false);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    return () => {
      if (localStorage.language) {
        setIsLanguageChosen(true);
      }

      if (localStorage.language === "fr") {
        setLanguage("fr");
      }
    };
  }, []);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  /*const insertHTML = (dataToInsert) => {
    const containerMessage = document.querySelector(".messagesContainer");
    containerMessage.insertAdjacentHTML(
      "beforeend",
      `<div class="fromAdaContainer">
             <p class="from-ada"> 
                <Typewriter>
                    onInit={(typeWriter) => {
                        typeWriter.typeString(beforeSentence + dataToInsert + afterSentence).start();
                    }}
                </Typewriter>
             </p>
          </div>`
    );
  };*/

  const toggleIsLanguageChosen = (language) => {
    if (language === "fr") {
      setLanguage("fr");
      localStorage.setItem("language", "fr");
    } else {
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
    setIsLanguageChosen(true);
  };

  const myAnswer = (answer) => {
    const containerMessage = document.querySelector(".messagesContainer");
    containerMessage.insertAdjacentHTML(
      "beforeend",
      `<div class="fromMeContainer">
             <p class="from-me">${answer}</p>
          </div>`
    );
  };

  const cleanName = (name) => {
    const firstLater = name[0].toUpperCase();
    const remainingLetters = name.slice(1);
    return firstLater + remainingLetters;
  };

  const onSubmit = (input) => {
    const name = cleanName(input);
    setUserName(name);
    myAnswer(name);
    setInput("");
    setTimeout(function () {
      apiFunction(name, "1");
    }, 1000);
  };

  return (
    <div className="homePage">
      {isLanguageChosen ? (
        <></>
      ) : (
        <>
          <div className="chooseLangueContainer">
            <p>Choose your language.</p>
            <div className="languages">
              <div
                className="lgButton"
                onClick={() => {
                  toggleIsLanguageChosen("fr");
                }}
              >
                <p>Français</p> <span>🇫🇷</span>
              </div>
              <div
                className="lgButton"
                onClick={() => {
                  toggleIsLanguageChosen("en");
                }}
              >
                <p>English</p> <span>🇺🇸</span>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={
          isLanguageChosen ? "homePageBody" : "homePageBody blurBackground"
        }
      >
        <div className="chatContainer">
          <div className="messagesContainer">
            <div className="fromAdaContainer">
              <p className="from-ada">
                {language === "en" ? (
                  <>
                    Hello ! <br />I introduce myself, I am ADA an artificial
                    intelligence created to simulate a human being. Let’s get
                    acquainted, what is your name?
                  </>
                ) : (
                  <>
                    Bonjour ! <br />
                    Je me présente, je suis <b>ADA</b> une intelligence
                    artificielle créée pour simuler un être humain. Faisons
                    connaissance, comment t'appelles-tu ?
                  </>
                )}
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
                className={
                  input.length > 2 ? "submitIcon" : "invalidSubmitIcon"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
