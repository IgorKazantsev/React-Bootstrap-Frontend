import React, { useState } from 'react';
import axios from 'axios';
import StartForm from './components/StartForm';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { decodeHtml } from './utils/decodeHtml';
import { Container } from 'react-bootstrap';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const startGame = async ({ category, difficulty }) => {
    try {
      const res = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 10,
          category,
          difficulty,
          type: 'multiple',
        }
      });

      if (res.data.response_code !== 0) {
        alert('Нет доступных вопросов для выбранных параметров');
        return;
      }

      const decodedQuestions = res.data.results.map(q => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHtml)
      }));

      setQuestions(decodedQuestions);
      setGameStarted(true);
      setCurrent(0);
      setAnswers([]);
    } catch (error) {
      console.error('Ошибка при загрузке вопросов:', error);
    }
  };

  const handleAnswer = (isCorrect) => {
    setAnswers([...answers, isCorrect]);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setGameStarted(false);
      }
    }, 1000);
  };

  return (
    <Container className="py-4">
      {!gameStarted && answers.length === 0 && (
        <StartForm onStart={startGame} />
      )}
      {gameStarted && questions.length > 0 && (
        <QuizQuestion
          question={questions[current]}
          index={current}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {!gameStarted && answers.length > 0 && (
        <QuizResult
          answers={answers}
          questions={questions}
        />
      )}
    </Container>
  );
};

export default App;
