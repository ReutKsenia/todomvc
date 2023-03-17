import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { FC } from 'react'
import colors from '../costants/colors'
import { useSelector } from 'react-redux'
import {
  selectActiveTodos,
  selectCompletedTodos,
} from '../redux/todos/todosSelector'
import { useAppDispatch } from '../redux/reduxStore'
import { clearCompleted } from '../redux/todos/todosReducer'

interface BottomPanelProps {
  activeLink: {
    all: boolean
    active: boolean
    completed: boolean
  }
  setAllFunc: Function
  setActiveFunc: Function
  setCompletedFunc: Function
}

const BottomPanel: FC<BottomPanelProps> = ({
  activeLink,
  setAllFunc,
  setActiveFunc,
  setCompletedFunc,
}) => {
  const dispatch = useAppDispatch()
  const completedTodos = useSelector(selectCompletedTodos)
  const activeTodos = useSelector(selectActiveTodos)

  const clearCompletedHandler = () => {
    dispatch(clearCompleted())
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{activeTodos.length} items left</Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => setAllFunc()}>
            <Text style={[styles.text, activeLink.all && styles.link]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveFunc()}>
            <Text style={[styles.text, activeLink.active && styles.link]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCompletedFunc()}>
            <Text style={[styles.text, activeLink.completed && styles.link]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 85 }}>
          <TouchableOpacity onPress={clearCompletedHandler}>
            <Text
              style={completedTodos.length > 0 ? styles.text : { opacity: 0 }}
            >
              Clear completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.shadow1} />
      <View style={styles.shadow2} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 30,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width - 40,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  link: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 3,
  },
  text: {
    fontFamily: 'Helvetica Neue Thin',
    fontSize: 12,
    color: colors.textAccent,
  },
  shadow1: {
    position: 'relative',
    zIndex: -1,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: colors.shadow,
    height: 6,
    width: Dimensions.get('window').width - 45,
  },
  shadow2: {
    position: 'relative',
    zIndex: -2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: colors.shadow,
    height: 6,
    width: Dimensions.get('window').width - 50,
  },
})

export default BottomPanel
