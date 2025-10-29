import styles from "./Root.module.css";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import MainContent from "../MainContent/MainContent";
import Footer from "../Footer/Footer";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuizList } from "../Redux/quizListSlice";

function Root() {
  const dispatch = useDispatch();

  const quizzes = useSelector((state) => state.quizData.quizzes);

  console.log(quizzes);

  useEffect(() => {
    dispatch(getQuizList());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Nav />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Root;
