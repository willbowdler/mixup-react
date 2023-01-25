import { useEdit } from '../../../../context/EditContext'
import edSty from '../../../../styles/Edit.module.css'

function AddItem({ keys }) {
  const { updateTableAndItems } = useEdit()

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

  let addItem = {
    editCase: 'insert',
    newItemCols: keys,
    newItemVals: keys.map((key) => null),
  }
  console.log(addItem)

  const updateAddItem = (index, newVal) => {
    addItem.newItemVals = addItem.newItemCols.map((val, i) => {
      if (index === i) return newVal
      else return addItem.newItemVals[i]
    })
    console.log(addItem)
  }

  return (
    <div className={edSty.editItem}>
      {keys
        ? keys.map((key, i) => {
            const updateKey = `${key}${Math.random()}`
            const title = returnTitle(key)
            return (
              <div key={updateKey} className={edSty.itemInpCont}>
                <h3>{title}:</h3>
                {key.includes('color') ? (
                  <input
                    onChange={(e) => {
                      updateAddItem(i, e.target.value)
                    }}
                    type='color'
                    defaultValue='#fff'
                  />
                ) : (
                  <input
                    onChange={(e) => {
                      updateAddItem(i, e.target.value)
                    }}
                    type='text'
                  />
                )}
              </div>
            )
          })
        : null}
      <div className={edSty.editX}>+</div>
    </div>
  )
}

export default AddItem
