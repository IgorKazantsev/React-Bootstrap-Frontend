import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';

const StartForm = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories);
        setCategory(res.data.trivia_categories[0]?.id || '');
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ category, difficulty });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Загрузка категорий...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">Выберите параметры игры</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Категория</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Сложность</Form.Label>
          <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Лёгкая</option>
            <option value="medium">Средняя</option>
            <option value="hard">Сложная</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Начать игру
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default StartForm;
