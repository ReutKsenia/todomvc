import { createSlice } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  text: string
  completed: boolean
}
export interface TodosState {
  todos: Array<Todo> | []
  activeTodos: Array<Todo> | []
  completedTodos: Array<Todo> | []
}

let initialState: TodosState = {
  todos: [],
  activeTodos: [],
  completedTodos: [],
}
const todosSlice = createSlice({
  name: 'todosReducer',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
      state.activeTodos = [...state.activeTodos, action.payload]
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) return { ...todo, completed: true }
        return todo
      })
      state.activeTodos = state.activeTodos.filter(
        (todo) => todo.id !== action.payload.id
      )
      state.completedTodos = [
        ...state.completedTodos,
        { ...action.payload, completed: true },
      ]
    },
    uncompleteTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) return { ...todo, completed: false }
        return todo
      })
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload.id
      )
      state.activeTodos = [
        ...state.activeTodos,
        { ...action.payload, completed: false },
      ]
    },
    allCompleteTodo: (state) => {
      state.todos = state.todos.map((todo) => {
        return { ...todo, completed: true }
      })
      state.activeTodos = []
      state.completedTodos = state.todos
    },
    allActiveTodo: (state) => {
      state.todos = state.todos.map((todo) => {
        return { ...todo, completed: false }
      })
      state.activeTodos = state.todos
      state.completedTodos = []
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.completed !== true)
      state.completedTodos = []
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
      state.activeTodos = state.activeTodos.filter(
        (todo) => todo.id !== action.payload.id
      )
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload.id
      )
    },
  },
})
const { actions, reducer } = todosSlice
export const {
  addTodo,
  completeTodo,
  uncompleteTodo,
  allCompleteTodo,
  allActiveTodo,
  clearCompleted,
  removeTodo,
} = actions

export default reducer
