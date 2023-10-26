import React from "react";

function QuestionItem({ onDelete, onSelectChange, question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={event => onSelectChange(id, event.target.value)}>{options}</select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
