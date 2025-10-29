import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import quizDataReducer from "./quizListSlice";
import quizQuestionsByIdReducer from "./quizQuestionsByIdSlice";

export const store = configureStore({
  applyMiddleware: thunk,
  reducer: {
    quizData: quizDataReducer,
    quizQuestions: quizQuestionsByIdReducer,
  },
});
