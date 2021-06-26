import TodoList from "./todo-list/TodoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP"; //key of data list in local storage
function App() {
  //state
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  //load data from local storage
  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if(storageTodoList){
      setTodoList(JSON.parse(storageTodoList));
    }
  }, [])

  //save data list to local storage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddButtonClick = useCallback(
    (e) => {
      //Thêm textInput vào array todoList
      setTodoList([
        {
          id: v4(),
          name: textInput,
          isCompleted: false,
        },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckButtonClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: true,
            }
          : todo
      )
    );
  }, []);

  const onRemoveBtnClick = useCallback(
    (id) => {
      setTodoList((prevState) =>
        prevState.map((todo, index) =>
          todo.id === id ? prevState.splice(index, 1) : todo
        )
      );
    },
    [todoList]
  );

  return (
    <>
      <h3> Danh sách cần làm </h3>{" "}
      <TextField
        name="add-todo"
        placeholder="Thêm việc cần làm"
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddButtonClick}
          >
            Thêm
          </Button>
        }
        css={{
          width: "400px",
        }}
        value={textInput}
        onChange={onTextInputChange}
      ></TextField>
      <TodoList
        todoList={todoList}
        onCheckButtonClick={onCheckButtonClick}
        onRemoveBtnClick={onRemoveBtnClick}
      />
    </>
  );
}
export default App;
