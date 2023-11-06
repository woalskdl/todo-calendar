import dayjs from "dayjs";
import { useState } from "react"

const defaultTodoList = [
  // {
  //   id : 1,
  //   content: '운동하기',
  //   date: dayjs(),
  //   isSuccess: true
  // },
  // {
  //   id : 2,
  //   content: '공부하기',
  //   date: dayjs(),
  //   isSuccess: false
  // },
  // {
  //   id : 3,
  //   content: 'RN 강의 수강하기',
  //   date: dayjs(),
  //   isSuccess: true
  // }
]

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input)
      return;
    
    const length = todoList.length;
    const lastId = length === 0 ? 0 : todoList[length - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id : lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false
      }
    ]

    setTodoList(newTodoList);
  }

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(newTodoList);
  }

  const toggleTodo = (todoId) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === todoId)
          return {
            ...todo,
            isSuccess : !todo.isSuccess
          }
      })
    )
  }

  const resetInput = () => {
    setInput('');
  }

  const filteredTodoList = todoList.filter(todo => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
    return isSameDate;
  })

  return {
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput
  }
}