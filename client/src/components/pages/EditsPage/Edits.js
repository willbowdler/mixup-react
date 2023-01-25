import edSty from '../../../styles/Edit.module.css'

import { useEdit } from '../../../context/EditContext'
import { useState } from 'react'
import EditItem from './ItemComps/EditItem'

function Edits() {
  const { editItems } = useEdit()

  return (
    <div className={edSty.edits}>
      {editItems
        ? editItems.map((item, i) => {
            return <EditItem key={i} item={item} />
          })
        : null}
      {/* Create add item functionality here*/}
    </div>
  )
}

export default Edits
