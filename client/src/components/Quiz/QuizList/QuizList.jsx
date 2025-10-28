import style from "./QuizList.module.css";

import { Link } from "react-router-dom";
import useSound from "use-sound";

import React from "react";

function QuizList({ quiz }) {
  const [play] = useSound(
    require(`../../../assets/audio/${quiz.id}/home_audio.mp3`),
    { volume: 1 }
  );

  return (
    <div className={style.wrapper} onMouseEnter={play}>
      <Link className={style.link} to={`/quiz/${quiz.id}`}>
        <div className={style.container}>
          <img
            className={style.image}
            src={require(`../../../assets/images/${quiz.id}/home_icon.jpg`)}
            alt=""
          />
          <p className={style.quiz}>{quiz.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default QuizList;
