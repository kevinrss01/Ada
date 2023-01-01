export const LanguagePage = ({
  displayWelcomeMessage,
  toggleIsLanguageChosen,
}) => {
  return (
    <div className="chooseLangueContainer">
      <p>Choose your language.</p>
      <div className="languages">
        <div
          className="lgButton"
          onClick={() => {
            toggleIsLanguageChosen("fr");
            displayWelcomeMessage("fr");
          }}
        >
          <p>Français</p>
          <span>🇫🇷</span>
        </div>
        <div
          className="lgButton"
          onClick={() => {
            toggleIsLanguageChosen("en");
            displayWelcomeMessage("en");
          }}
        >
          <p>English</p> <span>🇺🇸</span>
        </div>
      </div>
    </div>
  );
};
