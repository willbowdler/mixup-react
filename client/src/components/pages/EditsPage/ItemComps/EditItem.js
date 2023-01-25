import { useState } from 'react'
import { useEdit } from '../../../../context/EditContext'

import edSty from '../../../../styles/Edit.module.css'

import EditModal from './EditModal'

function EditItem({ item }) {
  const [modalShown, setModalShown] = useState(false)

  const { updateTableAndItems } = useEdit()

  const returnTitle = (prop) => {
    if (!prop.includes('_')) {
      return `${prop[0].toUpperCase()}${prop.substring(1)}`
    }
    if (prop.includes('_')) {
      const newKey = prop
        .split('_')
        .map((word) => {
          return `${word[0].toUpperCase()}${word.substring(1)}`
        })
        .join(' ')
      return newKey
    }
  }

  let alterItem = {
    name: item.name,
    editCase: 'update',
    alterCols: [],

    // Object.entries(item).map((it) => {
    //   return {
    //     col: it[0],
    //     val: it[1],
    //   }
    // }),
  }
  // console.log(alterItem)

  const updateAlterItem = (key, newVal) => {
    if (alterItem.alterCols.some((it) => it.col === key)) {
      console.log('This DOES exist in the array')
      alterItem.alterCols = alterItem.alterCols.map((it) => {
        if (it.col === key) {
          return {
            col: key,
            val: newVal,
          }
        }
        if (it.col !== key) {
          console.log(it)
          return it
        }
      })
    }
    if (!alterItem.alterCols.some((it) => it.col === key)) {
      console.log('This doesnt exist in the array')
      alterItem.alterCols.push({
        col: key,
        val: newVal,
      })
    }
    console.log(alterItem.alterCols)

    // NOTE remember the key is the column name
    updateTableAndItems(null, alterItem)
  }

  return (
    <div className={edSty.editItem}>
      {Object.entries(item).map((it) => {
        const updateKey = `${it[0]}${Math.random()}`
        const title = returnTitle(it[0])
        if (it[0] === 'id' || it[0] === 'rounds' || it[0] === 'chemicalscol')
          return
        return (
          <div key={updateKey} className={edSty.itemInpCont}>
            <h3>{title}:</h3>
            {it[0].includes('color') ? (
              <input
                onChange={(e) => {
                  updateAlterItem(it[0], e.target.value)
                }}
                type='color'
                defaultValue={it[1]}
              />
            ) : (
              <input
                onChange={(e) => {
                  updateAlterItem(it[0], e.target.value)
                }}
                type='text'
                defaultValue={it[1]}
              />
            )}
          </div>
        )
      })}
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
