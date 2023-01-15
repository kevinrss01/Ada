import { BiSend } from "react-icons/bi";
import { questionFunction } from "../functions/ApiCall";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import Loader from "react-loading";
import { Quotes } from "./Quotes";

export const HomePage = () => {
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    displayWelcomeMessage();
  }, []);

  const handleInput = (event) => {
    if (count === 1) {
      if (event.target.value.indexOf(" ") !== -1) {
        return;
      }
    }

    setInput(event.target.value);
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

    questionFunction(input, count)
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
        alert(
          "This program does not continue after 3 questions. Thank you for testing my website!"
        );
      }, 5000);
    }
  }, [count]);

  let welcomeMessage =
    "Hello ! <br/> I introduce my self, I am ADA an artificial intelligence created to simulate a human being. Let's get acquainted, what is your name ?";

  const displayWelcomeMessage = () => {
    const containerMessage = document.querySelector(".from-ada");
    const typewriter = new Typewriter(containerMessage, {
      loop: false,
      delay: 20,
    });
    typewriter.typeString(welcomeMessage).start();
  };

  return (
    <div className="homePage">
      <div className="homePageBody">
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
