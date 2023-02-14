import { useContext, createContext, useState } from 'react'

const EditContext = createContext()

export const EditProvider = ({ children }) => {
  const [tableAndItems, setTableAndItems] = useState({
    table: '',
    items: [],
  })

  const updateTableAndItems = (table, item, reset) => {
    setTableAndItems((prevState) => {
      let newState = prevState
      if (table) newState.table = table
      if (item) {
        if (
          prevState.items.some((it) => it.name === item.name) &&
          item.editCase === 'delete'
        ) {
          newState.items = newState.items.filter((it) =>
            it.name !== item.name ? true : false
          )
          newState.items.push(item)
        }
        if (!prevState.items.length === 0) {
          prevState.items.map((prevItem) => {
            if (item.name === prevItem.name) {
              return item
            }
          })
        }
        if (
          prevState.items.length === 0 ||
          !prevState.items.some((it) => it.name === item.name)
        ) {
          newState.items.push(item)
        }
        console.log(newState)
      }

      if (Array.isArray(item)) {
        item.forEach((it) => newState.items.push(it))
      }
      if (reset === 'reset') newState.items = []

      return newState
    })
  }

  const [editItems, setEditItems] = useState()
  const [addItems, setAddItems] = useState([])

  return (
    <EditContext.Provider
      value={{
        tableAndItems,
        updateTableAndItems,
        editItems,
        setEditItems,
        addItems,
        setAddItems,
      }}
    >
      {children}
    </EditContext.Provider>
  )
}

export const useEdit = () => {
  return useContext(EditContext)
}
