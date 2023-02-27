const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

export const defaultState = {
  groceries: getLocalStorage(),
  formInput: '',
  feedback: '',
  message: '',
  alert: false,
  isEditing: false,
  identifier: '',
}

export const reducer = (state, action) => {
  const { type, payLoad } = action
  const { formInput, groceries, isEditing, identifier } = state

  if (type === 'ONCHANGEHANDLER') {
    return { ...state, formInput: payLoad }
  }

  if (type === 'SUBMIT') {
    console.log(formInput)
    if (identifier) {
      const filter = groceries.map((grocery) =>
        identifier === grocery.id ? { ...grocery, text: formInput } : { ...grocery }
      )
      return {
        ...state,
        groceries: filter,
        formInput: '',
        identifier: '',
        alert: true,
        isEditing: false,
      }
    }

    if (formInput.trim() === '') {
      return { ...state, alert: true, feedback: 'DANGER', message: 'Your Entry Is Invalid' }
    }
    return {
      ...state,
      feedback: '',
      message: 'Successfully Added',
      alert: true,
      groceries: [...groceries, { text: formInput, id: new Date().getTime().toString() }],
      formInput: '',
      isEditing: false,
    }
  }

  if (type === 'CLOSE_MODAL') {
    return { ...state, alert: false }
  }

  if (type === 'CLEAR') {
    return { ...state, groceries: [], alert: true, message: 'Items Cleared Successfully' }
  }

  if (type === 'DELETE') {
    const filter = groceries.filter((grocery) => {
      const { id } = grocery
      return id !== payLoad
    })
    return { ...state, groceries: filter, alert: true, message: 'Item Deleted Successfully' }
  }

  if (type === 'EDIT') {
    const { text, id } = payLoad
    return {
      ...state,
      isEditing: true,
      formInput: text,
      alert: true,
      message: 'Editing Can Now Proceed',
      identifier: id,
    }
  }
}
