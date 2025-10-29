import style from "./Quiz.module.css";

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuizQuestionsById } from "../../Redux/quizQuestionsByIdSlice";

// import data from "../../../database/data.json";

function Quiz() {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  const dispatch = useDispatch();
  const selectedQuizName = useParams().quizName;

  const quizStatus = useSelector((state) => state.quizData.status);
  const quizQuestionsByIdStatus = useSelector(
    (state) => state.quizQuestions.status
  );

  const quizzes = useSelector((state) => state.quizData.quizzes);
  const quizQuestionsById = useSelector(
    (state) => state.quizQuestions.questions
  );

  console.log(quizzes);
  console.log("quizzes:", quizQuestionsById);

  useEffect(() => {
    dispatch(getQuizQuestionsById(selectedQuizName));
  }, [dispatch]);

  const quizName = useParams().quizName;
  const filterQuiz = quizzes.filter((quiz) => quiz.id === quizName);

  // console.log(filterQuiz[0].name);

  const checkAnswer = () => {
    let score = 0;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] === selectedAnswers[i]) {
        score++;
      }
    }
    // console.log(score);
    return score;
  };

  let score = checkAnswer();
  if (questionNumber >= quizQuestionsById.length) {
    return (
      <div className={style.result}>
        <h1 className={style.score}>
          Your Score: <br />
          {`${score}`}
        </h1>
        <h2 className={style.score}>{`out of ${quizQuestionsById.length}`}</h2>
        <Link to={"/"}>
          <button className={style.button}>Back Home</button>
        </Link>
      </div>
    );
  }

  // console.log(filterQuiz[0].quizQuestionsList.length);

  return (
    <>
      {quizStatus && quizQuestionsByIdStatus === "loading" && <h1>Loading</h1>}
      {quizStatus && quizQuestionsByIdStatus === "succeeded" && (
        <>
          <div className={style.wrapper}>
            <h1 className={style.title}>{`${filterQuiz[0].name}`}</h1>
            <div className={style.content}>
              <h2
                className={style.question}
              >{`${quizQuestionsById[questionNumber].question}`}</h2>
              <div>
                {quizQuestionsById[questionNumber].options.map(
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
      )}
    </>
  );
}

export default Quiz;
