import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './reducers/quizReducers'; // Import the quiz slice

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;