// src/actions/quizActions.js
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const PREV_QUESTION = 'PREV_QUESTION';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export const setData = (data) => ({
  type: SET_QUESTIONS,
  payload: data,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const prevQuestion = () => ({
  type: PREV_QUESTION,
});

export const submitAnswer = (answer,correctAnswer) => ({
  type: SUBMIT_ANSWER,
  payload: {answer:answer,correctAnswer:correctAnswer},
});
