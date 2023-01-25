import edSty from '../../../../styles/Edit.module.css'

import { useEdit } from '../../../../context/EditContext'

function EditModal({ item, setModalShown }) {
  const { updateTableAndItems } = useEdit()

  return (
    <div className={edSty.edModalCont}>
      <div className={edSty.edModal}>
        <div className={edSty.modalBtnCont}>
          Are you sure you would like to delete this item? {item.name}
          <br />
          You cannot undo this action.
          <button
            onClick={() => {
              updateTableAndItems(null, {
                name: `${item.name}`,
                editCase: 'delete',
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
