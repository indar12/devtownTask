import axios from "axios";
import React, { useEffect, useState } from "react";
import AddTodo from './AddTodo';
const Todos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async ()=> {
    try {
        const {data:{todos}} = await axios.get('http://localhost:8000/todos')
        setTodos(todos)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    getTodos()
  },[])
  return (
    <div>
      <h1>Todos</h1>
      <AddTodo getTodos={getTodos}/>
      <ol>
        {todos.map((todo) => (
           <li key={todo.id}>
            {todo.text}
            <button>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todos;
