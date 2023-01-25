import { useEffect } from 'react'

import edSty from '../../../styles/Edit.module.css'

import { useEdit } from '../../../context/EditContext'
import EditItem from './ItemComps/EditItem'
import AddItem from './ItemComps/AddItem'

function Edits() {
  const { editItems, setEditItems } = useEdit()

  return (
    <div className={edSty.edits}>
      {editItems
        ? editItems.map((item, i) => {
            if (item.addItem) {
              const keys = Object.keys(editItems[0]).filter((key) => {
                if (
                  key === 'id' ||
                  key === 'chemicalscol' ||
                  key === 'rounds'
                ) {
                  return false
                } else return true
              })
              return <AddItem key={i} keys={keys} />
            }
            return <EditItem key={i} item={item} />
          })
        : null}
      {/* Create add item functionality here*/}
      <div className={edSty.editAddItem}>
        {editItems ? (
          <div
            onClick={() =>
              setEditItems((prevState) => {
                let newState = [...prevState]
                newState.push({
                  addItem: true,
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
