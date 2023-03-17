import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../costants/colors'
import Input from '../components/Input'
import { useAppDispatch } from '../redux/reduxStore'
import { addTodo, Todo } from '../redux/todos/todosReducer'
import { useSelector } from 'react-redux'
import {
  selectActiveTodos,
  selectAllTodos,
  selectCompletedTodos,
} from '../redux/todos/todosSelector'
import TodoList from '../components/TodoList'
import BottomPanel from '../components/BottomPanel'

const MainScreen = () => {
  const allTodos = useSelector(selectAllTodos)
  const activeTodos = useSelector(selectActiveTodos)
  const completedTodos = useSelector(selectCompletedTodos)
  const dispatch = useAppDispatch()
  const [todos, setTodos] = useState<Array<Todo> | []>([])
  const [activeLink, setActiveLink] = useState({
    all: true,
    active: false,
    completed: false,
  })

  const setAllLinkHandler = () => {
    setActiveLink({ all: true, active: false, completed: false })
    setTodos(allTodos)
  }
  const setActiveLinkHandler = () => {
    setActiveLink({ all: false, active: true, completed: false })
    setTodos(activeTodos)
  }
  const setCompletedLinkHandler = () => {
    setActiveLink({ all: false, active: false, completed: true })
    setTodos(completedTodos)
  }
  const addTodoHandler = (text: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      text,
      completed: false,
    }
    dispatch(addTodo(newTodo))
  }

  useEffect(() => {
    setTodos(allTodos)
  }, [])

  useEffect(() => {
    if (activeLink.all) setTodos(allTodos)
    if (activeLink.active) setTodos(activeTodos)
    if (activeLink.completed) setTodos(completedTodos)
  }, [allTodos, activeTodos, completedTodos])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={styles.title}>todos</Text>
          <View style={styles.contentContainer}>
            <Input addTodoFunc={addTodoHandler} />
            <TodoList todos={todos} />
          </View>
          {allTodos.length > 0 && (
            <BottomPanel
              activeLink={activeLink}
              setAllFunc={setAllLinkHandler}
              setActiveFunc={setActiveLinkHandler}
              setCompletedFunc={setCompletedLinkHandler}
            />
          )}
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 25,
    fontFamily: 'Helvetica Neue Thin',
    fontSize: 64,
    color: colors.accent,
  },
  contentContainer: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 17,
  },
})

export default MainScreen
