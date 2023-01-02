import { BiSend } from "react-icons/bi";
import { apiFunction } from "../functions/ApiCall";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { LanguagePage } from "./LanguagePage";
import Loader from "react-loading";
import { Quotes } from "./Quotes";

export const HomePage = () => {
  const [language, setLanguage] = useState("");
  const [isLanguageChosen, setIsLanguageChosen] = useState(false);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //Check the localStorage to see language and display
  useEffect(() => {
    return () => {
      if (localStorage.language) {
        if (localStorage.language === "fr") {
          setLanguage("fr");
          displayWelcomeMessage("fr");
        }
        if (localStorage.language === "en") {
          setLanguage("en");
          displayWelcomeMessage("en");
        }

        setIsLanguageChosen(true);
      }
    };
  }, []);

  const handleInput = (event) => {
    if (count === 1) {
      if (event.target.value.indexOf(" ") !== -1) {
        return;
      }
    }

    setInput(event.target.value);
  };

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
             <p class="from-me">
             ${answer}
             </p>
          </div>`
    );
  };

  const cleanName = (name) => {
    const firstLater = name[0].toUpperCase();
    const remainingLetters = name.slice(1);
    return firstLater + remainingLetters;
  };

  const insertResponseInHTML = (dataToInsert) => {
    const containerMessage = document.querySelector(".messagesContainer");
    containerMessage.insertAdjacentHTML(
      "beforeend",
      `<div class="fromAdaContainer">
          <p  class="from-ada">${dataToInsert}</p>
        </div>`
    );
  };
  const onSubmit = (input) => {
    if (count === 1) {
      const name = cleanName(input);
      setUserName(name);
      myAnswer(name);
    } else {
      myAnswer(input);
    }
    setIsLoading(true);
    setInput("");

    apiFunction(input, count)
      .then((response) => {
        insertResponseInHTML(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("an error is produced please reload the page");
        setIsLoading(false);
      });

    setCount(count + 1);
  };

  useEffect(() => {
    if (count === 4) {
      setTimeout(() => {
        if (language === "fr") {
          alert(
            "Ce programme ne continue pas après 3 questions. Merci d'avoir testé mon site web ! "
          );
        } else {
          alert(
            "This program does not continue after 3 questions. Thank you for testing my website!"
          );
        }
      }, 5000);
    }
  }, [count]);

  const setWelcomeMessage = (language) => {
    let welcomeMessage;
    if (language === "fr") {
      welcomeMessage =
        "Bonjour ! <br />\n" +
        "        Je me présente, je suis <b>ADA</b> une intelligence artificielle créée\n" +
        "        pour simuler un être humain. Faisons connaissance, comment t'appelles-tu\n" +
        "        ?";
    } else {
      welcomeMessage =
        "Hello ! <br />I introduce myself, I am ADA an artificial intelligence\n" +
        "        created to simulate a human being. Let’s get acquainted, what is your\n" +
        "        name?";
    }
    return welcomeMessage;
  };
  const displayWelcomeMessage = (language) => {
    const welcomeMessage = setWelcomeMessage(language);
    const containerMessage = document.querySelector(".from-ada");
    const typewriter = new Typewriter(containerMessage, {
      loop: false,
      delay: 20,
    });
    typewriter.typeString(welcomeMessage).start();
  };

  return (
    <div className="homePage">
      {isLanguageChosen ? (
        <></>
      ) : (
        <LanguagePage
          toggleIsLanguageChosen={toggleIsLanguageChosen}
          displayWelcomeMessage={displayWelcomeMessage}
        />
      )}
      <div
        className={
          isLanguageChosen ? "homePageBody" : "homePageBody blurBackground"
        }
      >
        <div className="chatContainer">
          <div className="messagesContainer">
            {isLoading ? (
              <Loader
                className={"loader"}
                type={"spinningBubbles"}
                color={"#3C4048"}
                delay={10}
              />
            ) : (
              <></>
            )}

            <div className="fromAdaContainer">
              <p className="from-ada"></p>
            </div>
          </div>
          <div className="inputContainer">
            <input
              type="text"
              name="inputText"
              onChange={handleInput}
              value={input}
              maxLength={count === 4 ? 0 : 30}
              minLength={3}
              onKeyDown={(event) => {
                if (input.length > 2) {
                  if (event.key === "Enter") {
                    if (input) {
                      onSubmit(input);
                    }
                  }
                }
              }}
            />
            <div
              className="submitContainer"
              onClick={() => {
                if (input.length > 2) {
                  if (input) {
                    onSubmit(input);
                  }
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
        <Quotes />
      </div>
    </div>
  );
};
