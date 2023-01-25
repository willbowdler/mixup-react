import edSty from '../../../styles/Edit.module.css'

import { useEdit } from '../../../context/EditContext'
import { useData } from '../../../context/DataContext'

function EditHead() {
  const { tableAndItems, updateTableAndItems, setEditItems } = useEdit()
  const { fetchData } = useData()
  // TODO in this component we will push the table value into this function as the first param

  return (
    <div className={edSty.editHead}>
      <select
        className={edSty.editSelect}
        onInput={async (e) => {
          const response = await fetchData(e.target.value)
          setEditItems(response.res)
          updateTableAndItems(e.target.value, null, 'reset')
        }}
      >
        <option value=''>--Select Group to Edit--</option>
        <option value='techs'>Technicians</option>
        <option value='trucks'>Trucks</option>
        <option value='chems'>Chemicals</option>
      </select>
      <button
        onClick={() => {
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
        Save
      </button>
    </div>
  )
}

export default EditHead
