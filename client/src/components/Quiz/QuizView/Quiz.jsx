import style from "./Quiz.module.css";

import React, { use, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import data from "../../../database/data.json";

function Quiz() {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  const quizName = useParams().quizName;
  const filterQuiz = data.filter((quiz) => quiz.id === quizName);

  const checkAnswer = () => {
    let score = 0;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] === selectedAnswers[i]) {
        score++;
      }
    }
    console.log(score);
    return score;
  };

  let score = checkAnswer();
  if (questionNumber >= filterQuiz[0].quizQuestionsList.length) {
    return (
      <div className={style.result}>
        <h1 className={style.score}>
          Your Score: <br />
          {`${score}`}
        </h1>
        <h2 className={style.score}>
          {`out of ${filterQuiz[0].quizQuestionsList.length}`}
        </h2>
        <Link to={"/"}>
          <button className={style.button}>Back Home</button>
        </Link>
      </div>
    );
  }

  // console.log(filterQuiz[0].quizQuestionsList.length);

  return (
    <>
      <div className={style.wrapper}>
        <h1 className={style.title}>{`${filterQuiz[0].name}`}</h1>
        <div className={style.content}>
          {/* Take the filtered quiz and map out all the questions */}
          <h2
            className={style.question}
          >{`${filterQuiz[0].quizQuestionsList[questionNumber].question}`}</h2>
          <div>
            {filterQuiz[0].quizQuestionsList[questionNumber].options.map(
              (option, index) => {
                return (
                  <div key={index} className={style.input}>
                    <input
                      type="radio"
                      id={option}
                      name="quizOption"
                      value={option}
                      checked={selectedOption === option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              }
            )}
          </div>
          <button
            className={style.button}
            onClick={() => {
              setQuestionNumber((prev) => prev + 1);
              setSelectedAnswers((prev) => [...prev, selectedOption]);
              setCorrectAnswer([
                ...correctAnswer,
                filterQuiz[0].quizQuestionsList[questionNumber].answer,
              ]);
              checkAnswer();
            }}
          >
            Next Question
          </button>
        </div>
      </div>
    </>
  );
}

export default Quiz;
