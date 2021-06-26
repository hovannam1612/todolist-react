import React from "react";
import Todo from "./Todo";

const TodoList = (props) => {
  return (
    <>
      {props.todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} onCheckButtonClick={props.onCheckButtonClick} onRemoveBtnClick={props.onRemoveBtnClick}/>
      ))}
    </>
  );
};
export default TodoList;
