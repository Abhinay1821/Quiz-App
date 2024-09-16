// src/components/Quiz.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, nextQuestion, prevQuestion, submitAnswer } from './app/reducers/quizActions';

const Quiz = () => {
    const dispatch = useDispatch();
    const { data, currentQuestionsIndex, answers,correctAnswers } = useSelector((state) => state.quiz);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'); // Replace with your API URL
                const data = await response.json();
                dispatch(setData(data.results));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSubmit = (answer,correctAnswer) => {
        dispatch(submitAnswer(answer,correctAnswer));
        dispatch(nextQuestion());
    };

    const handlePrevQuestion = () => {
        dispatch(prevQuestion());
    };
    const scoreCalculation = () => {
        let score=0;
        console.log('answers',answers)
        for(let i=0;i<answers.length;i++){
            if(answers[i].answer===answers[i].correctAnswer) score++;
        }
        return score;
    }

    if (data?.length === 0) return <div>Loading...</div>;
    const currentData = data && data[currentQuestionsIndex];

    return (
        <div>
            {
                currentData && (
                    <>
                        <p>{currentData.question}</p>
                        <div style={{display:'flex',flexDirection:'column'}}>
                        {[...currentData.incorrect_answers, currentData.correct_answer].map((answer,i) => (
                            <button style={{cursor:'pointer'}} key={i} onClick={() => handleAnswerSubmit(answer,currentData.correct_answer)}>
                                {answer}
                            </button>
                        ))}
                        </div>
                        {currentQuestionsIndex > 0 && (
                            <button onClick={handlePrevQuestion}>Previous</button>
                        )}
                        {/* {currentQuestionsIndex === data.length - 1 && (
                            <button onClick={() => alert(`Quiz completed and Your Score is ${scoreCalculation()}!`)}>Finish</button>
                        )} */}
                        
                    </>
                )
            }
            {
                    currentQuestionsIndex === data?.length && (
                        <>
                            <p>Quiz completed and Your Score is {scoreCalculation()}!</p>
                            {
                                data.map((obj,index)=>{
                                    return (
                                        <>
                                        <p>Q. {obj.question}</p>
                                        <p>Your Answered : {answers[index].answer}</p>
                                        <p>Correct Answer : {answers[index].correctAnswer}</p>
                                        </>
                                    )
                                })
                            }
                            <h1>Refresh the page to take quiz Again</h1>
                        </>
                    )
                }
        </div>
    );
};

export default Quiz;
