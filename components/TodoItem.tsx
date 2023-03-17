import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Icon from './UI/Icon'
import colors from '../costants/colors'
import {
  completeTodo,
  removeTodo,
  Todo,
  uncompleteTodo,
} from '../redux/todos/todosReducer'
import { useAppDispatch } from '../redux/reduxStore'

interface TodoItemProps {
  todo: Todo
}
const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch()
  const [completed, setCompleted] = useState<boolean>(todo.completed)
  const [deleteButtonVisible, setDeleteButtonVisible] = useState<boolean>(false)

  useEffect(() => {
    setCompleted(todo.completed)
  }, [todo])

  const completeHandler = () => {
    setCompleted((prev) => !prev)
    dispatch(completeTodo(todo))
  }
  const uncompleteHandler = () => {
    setCompleted((prev) => !prev)
    dispatch(uncompleteTodo(todo))
  }
  const removeTodoHandler = () => {
    setCompleted((prev) => !prev)
    dispatch(removeTodo(todo))
  }

  return (
    <Pressable onPress={() => setDeleteButtonVisible(!deleteButtonVisible)}>
      <View style={styles.container}>
        {completed ? (
          <TouchableOpacity style={styles.icon} onPress={uncompleteHandler}>
            <Icon name='circle-checked' color={colors.done} size={28} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.icon} onPress={completeHandler}>
            <Icon name='circle' color={colors.greyIcon} size={28} />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={completed ? styles.textCompleted : styles.text}>
            {todo.text}
          </Text>
        </View>
        {deleteButtonVisible && (
          <TouchableOpacity onPress={removeTodoHandler}>
            <Icon name='close' color={colors.close} size={28} />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  icon: {
    marginLeft: 4,
    marginRight: 8,
  },
  textContainer: {
    paddingVertical: 14,
    paddingRight: 10,
    width: Dimensions.get('window').width - 110,
  },
  text: {
    fontFamily: 'Helvetica Neue Thin',
    fontSize: 16,
    color: colors.black,
  },
  textCompleted: {
    fontFamily: 'Helvetica Neue Thin',
    fontSize: 16,
    color: colors.completedItemText,
    textDecorationLine: 'line-through',
  },
})

export default TodoItem
