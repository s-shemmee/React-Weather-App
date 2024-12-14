import React, { useState } from "react";
import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyButton({ onClick }) {
  return (
    <button onClick={onClick} className="button-container">
      Εισαγωγή Μηνύματος
    </button>
  );
}

function App() {
  const [isTextboxVisible, setTextboxVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Εμφάνιση του textbox
  const handleButtonClick = () => {
    setTextboxVisible(true);
  };

  // Υποβολή του περιεχομένου του textbox
  const handleSubmit = () => {
    alert(`Submitted value: ${inputValue}`);
    setTextboxVisible(false);
    setInputValue(""); // Καθαρισμός του input
  };

  return (
    <div className="App">
      {/* Background */}
      <div className="background">
        {/* Κουμπί */}
        <div className="button-container">
          {!isTextboxVisible && <MyButton onClick={handleButtonClick} />}
        </div>

        {/* Εμφάνιση Textbox και κουμπιού αποστολής */}
        {isTextboxVisible && (
          
          <div className="textbox-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your text here"
              className="textbox-container"
            />
          
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
            
          </div>
         
        )}
      </div>
    </div>
  );
}

export default App;

