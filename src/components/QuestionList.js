import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => {
      setQuestions(questions);
    });
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestion = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestion);
    });
  }

  function handleAnswers(id, correctAnswer) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctAnswer}),
    })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    })
  }

  const questionItemList = questions.map((q) => (
    <QuestionItem
    key={q.id}
    question={q}
    onDeleteClick={handleDelete}
    onAnswerChange={handleAnswers}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItemList}</ul>
    </section>
  );
}

export default QuestionList;
