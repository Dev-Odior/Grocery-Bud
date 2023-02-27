import { useEffect } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'
import { reducer, defaultState } from '../reducer'

export const AppContext = createContext({
  dispatcher: () => null,
  formInput: '',
  feedback: '',
  message: '',
  alert: false,
  isEditing: false,
})

export const AppContextProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, defaultState)
  const { groceries, formInput, message, feedback, alert, isEditing } = state

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(groceries))
  }, [groceries])

  const value = { dispatcher, groceries, formInput, feedback, message, alert, isEditing }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
