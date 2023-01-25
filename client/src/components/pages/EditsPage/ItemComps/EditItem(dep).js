import { useState, useEffect } from 'react'

import { useEdit } from '../../../../context/EditContext'

import edSty from '../../../../styles/Edit.module.css'

import EditModal from '../EditModal'

function EditItem({ functionKey, item }) {
  const [modalShown, setModalShown] = useState(false)
  const { updateTableAndItems } = useEdit()
  //   // TODO in this component we will create query items to push into this function

  let alterItem = {
    name: item.name,
    editCase: 'update',
    alterCols: [],
  }

  const updateAlterItem = (key, newVal) => {
    // NOTE remember the key is the column name
    console.log(alterItem)
    alterItem.alterCols = alterItem.alterCols.map((it) => {
      if (it.col === key)
        return {
          col: key,
          val: newVal,
        }
      if (it.col !== key) return it
    })
  }

  const flexItems = Object.entries(item)

  return (
    <div className={edSty.editItem}>
      {flexItems
        ? flexItems.map((it, i) => {
            return (
              <div key={i}>
                <div>{it[0]}</div>
                {it[0] === 'color' ? (
                  <input type='color' defaultValue={it[1]} />
                ) : (
                  <input type='text' defaultValue={it[1]} />
                )}
              </div>
            )
          })
        : null}
      {modalShown ? (
        <EditModal item={item} setModalShown={setModalShown} />
      ) : null}
      <div onClick={() => setModalShown(true)} className={edSty.editX}>
        ✕
      </div>
    </div>
  )
}

export default EditItem
