import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  status: "idle",
  error: null,
  questions: [],
};

export const quizQuestionsByIdSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizQuestionsById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getQuizQuestionsById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.questions = action.payload;
    });
    builder.addCase(getQuizQuestionsById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getQuizQuestionsById = createAsyncThunk(
  "quizQuestions/getQuizQuestionsById",
  async (quizId) => {
    const response = await fetch(`${SERVER_URL}/quiz/${quizId}`);
    const json = await response.json();
    return json;
  }
);

export default quizQuestionsByIdSlice.reducer;
