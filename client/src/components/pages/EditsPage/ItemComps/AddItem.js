import { useEdit } from '../../../../context/EditContext'
import edSty from '../../../../styles/Edit.module.css'

function AddItem({ item, keys, id }) {
  const { updateTableAndItems, setAddItems } = useEdit()

  const returnTitle = (key) => {
    if (!key.includes('_')) {
      return `${key[0].toUpperCase()}${key.substring(1)}`
    }
    if (key.includes('_')) {
      const newKey = key
        .split('_')
        .map((word) => {
          return `${word[0].toUpperCase()}${word.substring(1)}`
        })
        .join(' ')
      return newKey
    }
  }

  const updateAddItem = (index, newVal) => {
    setAddItems((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === id) {
          item.newItemVals = item.newItemCols.map((val, i) => {
            if (index === i) return newVal
            else return item.newItemVals[i]
          })
          return item
        } else return item
      })
      console.log(newState)
      return newState
    })
  }

  return (
    <div className={edSty.editItem}>
      {keys
        ? keys.map((key, i) => {
            const title = returnTitle(key)
            return (
              <div key={i} className={edSty.itemInpCont}>
                <h3>{title}:</h3>
                {key.includes('color') ? (
                  <input
                    onChange={(e) => {
                      updateAddItem(i, e.target.value)
                    }}
                    type='color'
                    // defaultValue={}
                  />
                ) : (
                  <input
                    onChange={(e) => {
                      updateAddItem(i, e.target.value)
                    }}
                    type='text'
                    defaultValue={item.newItemVals[i]}
                  />
                )}
              </div>
            )
          })
        : null}
      <div className={edSty.editX}>{null}</div>
    </div>
  )
}

export default AddItem
