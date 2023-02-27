import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

const Alert = () => {
  const { feedback, message, dispatcher } = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      dispatcher({ type: 'CLOSE_MODAL' })
    }, 1000)

    return () => {
      clearTimeout()
    }
  }, [])

  return (
    <span className={`alert ${feedback === 'DANGER' ? 'alert-danger' : 'alert-success '}`}>
      {message}
    </span>
  )
}

export default Alert
