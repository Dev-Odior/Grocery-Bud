import React, { useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { AppContext } from './context/AppContext'

const List = () => {
  const { dispatcher } = useContext(AppContext)

  const deleteHandler = (id) => {
    dispatcher({ type: 'DELETE', payLoad: id })
  }

  const editHandler = (id, text) => {
    console.log(id, text, 'the values')
    dispatcher({ type: 'EDIT', payLoad: { id, text } })
  }

  const { groceries } = useContext(AppContext)
  return (
    <ul>
      {groceries.map((grocery) => {
        const { text, id } = grocery
        return (
          <div key={id} className="grocery-item ">
            <li className="title">{text}</li>
            <div>
              <FaEdit className="edit-btn" onClick={() => editHandler(id, text)} />
              <FaTrash className="delete-btn" onClick={() => deleteHandler(id)} />
            </div>
          </div>
        )
      })}
    </ul>
  )
}

export default List
