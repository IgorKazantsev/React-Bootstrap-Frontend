import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

const QuestionTimer = ({ duration = 15, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, isActive, onTimeUp]);

  const percent = Math.round((timeLeft / duration) * 100);

  return (
    <div className="mb-3">
      <ProgressBar
        now={percent}
        label={`${timeLeft} сек`}
        variant={percent < 30 ? 'danger' : 'primary'}
        animated
        striped
      />
    </div>
  );
};

export default QuestionTimer;
