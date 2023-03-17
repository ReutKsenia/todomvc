import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import colors from '../costants/colors'
import Icon from './UI/Icon'
import { useAppDispatch } from '../redux/reduxStore'
import { allActiveTodo, allCompleteTodo } from '../redux/todos/todosReducer'
import { useSelector } from 'react-redux'
import { selectActiveTodos } from '../redux/todos/todosSelector'

interface InputProps {
  addTodoFunc: Function
}

const Input: FC<InputProps> = ({ addTodoFunc }) => {
  const dispatch = useAppDispatch()
  const activeTodos = useSelector(selectActiveTodos)
  const [text, setText] = useState('')
  const [addButtonVisible, setAddButtonVisible] = useState(false)

  const addTodoHandler = () => {
    if (text.trim().length > 0) {
      addTodoFunc(text)
    }
    setText('')
  }

  const completeAllHandler = () => {
    if (activeTodos.length > 0) dispatch(allCompleteTodo())
    else dispatch(allActiveTodo())
  }

  useEffect(() => {
    if (text.trim().length > 0) setAddButtonVisible(true)
    else setAddButtonVisible(false)
  }, [text])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={completeAllHandler} style={{ marginLeft: 5 }}>
        <Icon name='arrow-down' color={colors.greyIcon} size={25} />
      </TouchableOpacity>
      <TextInput
        onChangeText={setText}
        value={text}
        placeholder='What needs to be done?'
        placeholderTextColor={colors.completedItemText}
        style={styles.input}
      />
      {addButtonVisible && (
        <TouchableOpacity onPress={addTodoHandler} style={styles.addButton}>
          <Icon name='close' color={colors.done} size={25} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 120,
    height: 20,
    marginVertical: 14,
    marginLeft: 10,
    fontFamily: 'Helvetica Neue Thin',
    fontSize: 16,
  },
  addButton: {
    marginRight: 10,
    transform: [{ rotate: '45deg' }],
  },
})

export default Input
