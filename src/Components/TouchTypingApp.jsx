import React, { useState, useEffect } from "react";
import "../../src/Styles/TouchTypingApp.css";

const TouchTypingApp = () => {
  const [expectedText, setExpectedText] = useState("asdfjkl;");
  const [inputText, setInputText] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputText(inputValue);

    if (!startTime) {
      setStartTime(new Date());
    }

    if (inputValue === expectedText) {
      setEndTime(new Date());
    }
  };

  useEffect(() => {
    const calculateAccuracy = () => {
      const expectedLength = expectedText.length;
      const inputLength = inputText.length;
      let correctChars = 0;

      for (let i = 0; i < inputLength; i++) {
        if (inputText[i] === expectedText[i]) {
          correctChars++;
        }
      }

      const calculatedAccuracy = (correctChars / expectedLength) * 100;
      setAccuracy(calculatedAccuracy.toFixed(2));
    };

    calculateAccuracy();
  }, [inputText, expectedText]);

  const calculateTypingSpeed = () => {
    if (startTime && endTime) {
      const timeDiff = Math.abs(endTime - startTime);
      const minutes = timeDiff / (1000 * 60);
      const words = expectedText.trim().split(/\s+/).length;
      const typingSpeed = Math.round(words / minutes);
      return typingSpeed || 0;
    }
    return 0;
  };

  const handleRestart = () => {
    setExpectedText("asdfjkl;");
    setInputText("");
    setAccuracy(100);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="container">
      <h1 className="header">Touch Typing</h1>
      <p>Type the following text:</p>
      <p>{expectedText}</p>
      <input
        className="input-box"
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <div>
        <p>Accuracy: {accuracy}%</p>
        <p>Typing Speed: {calculateTypingSpeed()} WPM</p>
      </div>
      {endTime && (
        <div>
          <p>Finished typing!</p>
          <button className="my-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default TouchTypingApp;
