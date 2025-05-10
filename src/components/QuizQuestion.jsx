import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import QuestionTimer from './QuestionTimer';

const shuffleAnswers = (correct, incorrect) => {
  const all = [...incorrect, correct];
  return all.sort(() => Math.random() - 0.5);
};

const QuizQuestion = ({ question, index, total, onAnswer }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setShuffledAnswers(shuffleAnswers(question.correct_answer, question.incorrect_answers));
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correct_answer;
    onAnswer(isCorrect);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(''); // блокировка кнопок
      onAnswer(false);       // пропуск считается неправильным
    }
  };

  const getVariant = (answer) => {
    if (!selectedAnswer) return 'outline-secondary';
    if (answer === question.correct_answer) return 'success';
    if (answer === selectedAnswer) return 'danger';
    return 'outline-secondary';
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          Вопрос {index + 1} из {total}
        </Card.Title>

        <QuestionTimer
          duration={15}
          isActive={selectedAnswer === null}
          onTimeUp={handleTimeUp}
        />

        <Card.Text className="mb-4">
          {question.question}
        </Card.Text>

        <ButtonGroup vertical className="d-flex gap-2">
          {shuffledAnswers.map((answer, idx) => (
            <Button
              key={idx}
              variant={getVariant(answer)}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </Button>
          ))}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default QuizQuestion;
