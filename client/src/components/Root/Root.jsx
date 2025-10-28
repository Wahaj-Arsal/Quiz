import styles from "./Root.module.css";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import MainContent from "../MainContent/MainContent";
import Footer from "../Footer/Footer";

import React from "react";

function Root() {
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
