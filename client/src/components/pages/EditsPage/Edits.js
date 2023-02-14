import { useEffect } from 'react'

import edSty from '../../../styles/Edit.module.css'

import { useEdit } from '../../../context/EditContext'
import EditItem from './ItemComps/EditItem'
import AddItem from './ItemComps/AddItem'

function Edits() {
  const { editItems, setEditItems, addItems, setAddItems } = useEdit()

  let keys

  return (
    <div className={edSty.edits}>
      {editItems
        ? editItems.map((item, i) => {
            keys = Object.keys(editItems[0]).filter((key) => {
              if (key === 'id' || key === 'chemicalscol' || key === 'rounds') {
                return false
              } else return true
            })

            return <EditItem key={i} item={item} />
          })
        : null}
      {addItems
        ? addItems.map((item, i) => {
            return <AddItem key={i} item={item} keys={keys} id={item.id} />
          })
        : null}
      {/* Create add item functionality here*/}
      <div className={edSty.editAddItem}>
        {editItems ? (
          <div
            onClick={() =>
              setAddItems((prevState) => {
                let newState = [...prevState]
                newState.push({
                  editCase: 'insert',
                  newItemCols: keys,
                  newItemVals: keys.map((key) => null),
                  id: Math.ceil(Math.random() * 100000000000),
                })
                return newState
              })
            }
            className={edSty.editPlus}
          >
            +
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Edits
