import styles from "./Home.module.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import QuizList from "../Quiz/QuizList/QuizList";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";

function Home() {
  const [audioReady, setAudioReady] = useState(false);
  const [data, setData] = useState([]);

  // Enable Audio Context on user interaction, by clicking anywhere on the page, rather than selecting a specific quiz and then going back to the homepage to enable onHover sounds
  useEffect(() => {
    const enableAudio = () => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume().then(() => setAudioReady(true));
      document.removeEventListener("click", enableAudio);
    };
    document.addEventListener("click", enableAudio);
  }, []);

  //Fetch quiz data from server on component mount
  useEffect(() => {
    getData();
  }, []);

  //Calls API server to get quiz data
  const getData = () => {
    axios({
      method: "GET",
      url: `${SERVER_URL}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.home_title}>Welcome to Quiz Land!</h1>
      <div className={styles.quiz_container}>
        {data.map((quiz, index) => {
          return <QuizList key={index} quiz={quiz} />;
        })}
      </div>
    </div>
  );
}

export default Home;
