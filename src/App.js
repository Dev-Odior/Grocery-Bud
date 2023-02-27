import React, { useState, useEffect, useContext } from 'react'
import List from './List'
import Alert from './Alert'
import { AppContext } from './context/AppContext'

function App() {
  const { dispatcher, formInput, alert, isEditing } = useContext(AppContext)
  const onChangeHandler = (event) => {
    const { value } = event.target
    dispatcher({ type: 'ONCHANGEHANDLER', payLoad: value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    dispatcher({ type: 'SUBMIT' })
  }

  const clearHandler = (event) => {
    dispatcher({ type: 'CLEAR' })
  }
  return (
    <main>
      <section className="section-center">
        <form className="grocery-form" onSubmit={onSubmitHandler}>
          {alert && <Alert />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              value={formInput}
              className="grocery"
              placeholder="e.g eggs"
              onChange={onChangeHandler}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        <div className="grocery-container">
          <List />
          <button className="clear-btn" onClick={clearHandler}>
            clear items
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
