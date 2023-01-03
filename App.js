import { View, Text } from 'react-native'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Pagination from './src/components/pagination'
import useReducer from './src/components/useReducer'

const store = configureStore({
  reducer: useReducer
})

const App = () => {
  return (
    <Provider store={store}>
      <Pagination />
    </Provider>
  )
}

export default App