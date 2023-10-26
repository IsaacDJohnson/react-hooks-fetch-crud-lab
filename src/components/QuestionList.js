import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({data}) {

  
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then((data) => {
        setQuestions(data)
    })
  }, [])

  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`,{method: 'DELETE'})
    .then(res => res.json())
    .then(() => { 
      const newQuestion = questions.filter(ques => ques.id!= id)
      setQuestions(newQuestion)
    })
  }

  function handleAnswer(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({correctIndex}),
    })
    .then(data=>data.json())
    .then(data=>{
  
  const updated=questions.map(item=>{
    if(item.id===data.id){
      return data
    } return item
  })
    console.log(updated,"after upadat");
    setQuestions(updated)  
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions ? questions.map((item, i)=> <QuestionItem key={i} onSelectChange={handleAnswer} question={item} onDelete={()=> onDelete(item.id)}/>):[]}
      </ul>
    </section>
  );
}

export default QuestionList;