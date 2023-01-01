import axios from "axios";
import { useEffect, useState } from "react";
export const Quotes = () => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      params: { language_code: "en" },
      headers: {
        "X-RapidAPI-Key": "14b8eccabcmsha2eda835da87d52p1ce5c5jsn27276cf68176",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.originator);
        setQuote(response.data.content);
        setAuthor(response.data.originator);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="quotesContainer">
      <h2>Citations 🏆</h2>
      <div className="quotesTextContainer">
        {quote ? (
          <>
            <p>"{quote}"</p>
            <p>
              <a href={author?.url}>
                <i>- {author?.name} </i>
              </a>
            </p>
            <p className="warning">
              Quotes are random and are in no case endorsed by the author of
              this website.
            </p>
          </>
        ) : (
          <p>No quotes found :(</p>
        )}
      </div>
    </div>
  );
};
