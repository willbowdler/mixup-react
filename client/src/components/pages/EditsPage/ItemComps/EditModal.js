import edSty from '../../../../styles/Edit.module.css'

import { useEdit } from '../../../../context/EditContext'

function EditModal({ item, setModalShown }) {
  const { updateTableAndItems, setEditItems } = useEdit()

  return (
    <div className={edSty.edModalCont}>
      <div className={edSty.edModal}>
        <div className={edSty.modalBtnCont}>
          Are you sure you would like to delete this item? {item.name}
          <br />
          Once you click 'Save', you cannot undo this action. Refreshing the
          page before saving will undo this delete.
          <button
            onClick={() => {
              updateTableAndItems(null, {
                name: `${item.name}`,
                editCase: 'delete',
              })
              setEditItems((prevState) => {
                let newState = prevState.filter((it) => {
                  if (it.name === item.name) {
                    return false
                  } else {
                    return true
                  }
                })
                return newState
              })
              setModalShown(false)
            }}
          >
            Yes
          </button>
          <button onClick={() => setModalShown(false)}>No</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
