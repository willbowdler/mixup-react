import edSty from '../../../styles/Edit.module.css'

import EditHead from './EditHead'
import Edits from './Edits'

function EditsMain() {
  return (
    <div className={edSty.editCont}>
      <div className={edSty.editForm}>
        <div className={edSty.headAndEditsCont}>
          <EditHead />
          <Edits />
        </div>
      </div>
    </div>
  )
}

// TODO be able to change the mySQL records for techs, trucks, and chemicals. Also be prepared to add edit preset logic in here too
// Have a header that gives you an option on what to edit. Then render edit items based on the item selected with inputs. then have a save button that alters the records that were modified in the sql table

export default EditsMain
