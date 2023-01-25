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
      // if (item) prevState.items.push(item)
      if (item) {
        if (!prevState.items.length === 0) {
          prevState.items.map((prevItem) => {
            if (item.name === prevItem.name) {
              return item
            }
          })

          // YOU have to figure out how to add a new item if it is not already contained in the array
        }
        if (
          prevState.items.length === 0 ||
          !prevState.items.some((it) => it.name === item.name)
        ) {
          newState.items.push(item)
          console.log('Yahweh is my Shepherd')
        }
        // prevState.items = prevState.items.map((item, i) => {
        //   // NOTE if there is no item here corresponding to an item already altered push that item
        // })
        console.log(newState)
      }
      if (reset === 'reset') newState.items = []

      return newState
    })
  }

  const [editItems, setEditItems] = useState()

  // {
  //   name: 'Will Bowdler',
  //   editCase: 'update',
  //   alterCols: [
  //     {
  //       col: 'name',
  //       val: 'Will Bowdler',
  //     },
  //     {
  //       col: 'phone_number',
  //       val: '6015197970',
  //     },
  //   ],
  // },

  return (
    <EditContext.Provider
      value={{ tableAndItems, updateTableAndItems, setEditItems, editItems }}
    >
      {children}
    </EditContext.Provider>
  )
}

export const useEdit = () => {
  return useContext(EditContext)
}
