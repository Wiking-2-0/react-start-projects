import React, { useState } from 'react';
import './quiz.scss';

const questionsList = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function Result({correct, resetQuiz}) {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='Success icon' />
            <h2>Вы отгадали {correct} ответа из {questionsList.length}</h2>
            <button type='button' onClick={resetQuiz}>Попробовать снова</button>
        </div>
    );
}

function Game({ step, question, onClickVariant }) {
    const progress = Math.round(step / questionsList.length * 100);

    return (
        <>
            <div className="progress">
                <div style={{ width: `${progress}%` }} className="progress__inner"></div>
            </div>
            <h1>{ question.title }</h1>
            <ul>
                {
                    question.variants.map((text, index) => (
                        <li key={text} onClick={onClickVariant.bind(this, index)}>{text}</li>
                    ))
                }
            </ul>
        </>
    );
}

function Quiz() {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const question = questionsList[step];

    const onClickVariant = index => {

        setStep(prevStep => prevStep + 1);

        if (index === question.correct) {
            setCorrect(prevCorrect => prevCorrect + 1)
        }
    }

    const resetQuiz = () => {
        setStep(0);
        setCorrect(0);
    }

    return (
        <div className="quiz-wrapper">
            <div className="quiz">
            {
                step !== questionsList.length
                    ? <Game step={step} question={question} onClickVariant={onClickVariant} />
                    : <Result correct={correct} resetQuiz={resetQuiz} />
            }
            </div>
        </div>
    );
}

export default Quiz;
