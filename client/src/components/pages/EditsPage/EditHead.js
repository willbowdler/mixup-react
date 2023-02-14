import edSty from '../../../styles/Edit.module.css'

import { useEdit } from '../../../context/EditContext'
import { useData } from '../../../context/DataContext'

function EditHead() {
  const {
    tableAndItems,
    updateTableAndItems,
    setEditItems,
    setAddItems,
    addItems,
  } = useEdit()
  const { fetchData } = useData()
  // TODO in this component we will push the table value into this function as the first param

  return (
    <div className={edSty.editHead}>
      <select
        className={edSty.editSelect}
        onInput={async (e) => {
          const response = await fetchData(e.target.value)
          setEditItems(response.res)
          setAddItems([])
          updateTableAndItems(e.target.value, null, 'reset')
        }}
      >
        <option value=''>--Select Group to Edit--</option>
        <option value='technicians'>Technicians</option>
        <option value='trucks'>Trucks</option>
        <option value='chemicals'>Chemicals</option>
      </select>
      <button
        onClick={() => {
          updateTableAndItems(null, addItems)
          fetch('/api/edit/query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tableAndItems),
          })
        }}
        className={edSty.editSave}
      >
        Submit
      </button>
    </div>
  )
}

export default EditHead
