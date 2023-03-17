import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/reduxStore'
import MainScreen from './screens/MainScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'Helvetica Neue Thin': require('./assets/fonts/HelveticaNeueCyr-Thin.otf'),
  })
}
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log('error')}
      />
    )
  }
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )
}
