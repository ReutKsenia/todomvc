import React, { FC } from 'react'
import { Todo } from '../redux/todos/todosReducer'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Array<Todo>
}
const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </>
  )
}

export default TodoList
