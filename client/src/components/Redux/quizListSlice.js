import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  status: "idle",
  error: null,
  quizzes: [],
};

export const quizListSlice = createSlice({
  name: "quizList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getQuizList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.quizzes = action.payload;
    });
    builder.addCase(getQuizList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getQuizList = createAsyncThunk(
  "quizList/getQuizData",
  async () => {
    const response = await fetch(`${SERVER_URL}/quiz`);
    const json = await response.json();
    return json;
  }
);

export default quizListSlice.reducer;
