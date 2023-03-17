import { RootState } from '../reduxStore'

const selectTodosState = (state: RootState) => state.todos

export const selectAllTodos = (state: RootState) =>
  selectTodosState(state).todos
export const selectActiveTodos = (state: RootState) =>
  selectTodosState(state).activeTodos
export const selectCompletedTodos = (state: RootState) =>
  selectTodosState(state).completedTodos
