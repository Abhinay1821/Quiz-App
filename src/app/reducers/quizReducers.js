import { SET_QUESTIONS,NEXT_QUESTION,PREV_QUESTION,SUBMIT_ANSWER } from "./quizActions";

const initialState = {
    data:[],
    currentQuestionsIndex:0,
    answers:[],
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_QUESTIONS:
        return {
          ...state,
          data: action.payload,
        };
      case NEXT_QUESTION:
        return {
          ...state,
          currentQuestionsIndex: state.currentQuestionsIndex + 1,
        };
      case PREV_QUESTION:
        return {
          ...state,
          currentQuestionsIndex: state.currentQuestionsIndex - 1,
        };
      case SUBMIT_ANSWER:
        return {
          ...state,
          answers: [...state.answers, action.payload],
        };
      default:
        return state;
    }
  };
  
export default quizReducer;