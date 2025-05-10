# React Trivia Quiz (Bootstrap + Vite)

This project is a responsive quiz app built with **React**, **Vite**, and **React Bootstrap**. It loads trivia questions from the [Open Trivia API](https://opentdb.com/), includes a timer, and displays game statistics.

---

## Features

- ✅ Load questions from Trivia API
- ✅ Decode HTML entities in questions/answers
- ✅ Answer validation with colored feedback (green/red)
- ✅ Timer (15 seconds per question)
- ✅ Auto-skip to next question on timeout
- ✅ Show correct/incorrect stats at the end
- ✅ Category and difficulty selection before starting

---

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/react-bootstrap-frontend.git
cd react-bootstrap-frontend

# Install dependencies
npm install

# Start development server
npm run dev

src/
├── components/
│   ├── StartForm.jsx
│   ├── QuizQuestion.jsx
│   ├── QuestionTimer.jsx
│   └── QuizResult.jsx
├── utils/
│   └── decodeHtml.js
├── App.jsx
└── main.jsx
