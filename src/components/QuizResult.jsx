import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

const QuizResult = ({ answers, questions }) => {
  const correctCount = answers.filter(Boolean).length;
  const incorrectCount = answers.length - correctCount;
  const percent = Math.round((correctCount / answers.length) * 100);

  const difficultyMap = { easy: 1, medium: 2, hard: 3 };

  const averageDifficultyRaw = questions.reduce((sum, q) => {
    return sum + (difficultyMap[q.difficulty] || 0);
  }, 0) / questions.length;

  const averageDifficulty =
    averageDifficultyRaw < 1.5
      ? 'Лёгкая'
      : averageDifficultyRaw < 2.5
      ? 'Средняя'
      : 'Сложная';

  const restart = () => window.location.reload();

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Результаты игры</Card.Title>
        <ListGroup className="my-4">
          <ListGroup.Item>Правильных: {correctCount}</ListGroup.Item>
          <ListGroup.Item>Неправильных: {incorrectCount}</ListGroup.Item>
          <ListGroup.Item>Процент: {percent}%</ListGroup.Item>
          <ListGroup.Item>Средняя сложность: {averageDifficulty}</ListGroup.Item>
        </ListGroup>
        <Button variant="primary" onClick={restart}>Играть снова</Button>
      </Card.Body>
    </Card>
  );
};

export default QuizResult;
