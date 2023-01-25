import { useEffect } from 'react'

import edSty from '../../../styles/Edit.module.css'

import EditHead from './EditHead'
import Edits from './Edits'

function EditsMain() {
  useEffect(() => {
    const data = {
      // IMPORTANT Need to programmatically create this object based on what happens on the ui
      // NOTE tableAndItems state. Table is updated based on select value. Items are added programmatically as certain actions take place on the items
      table: 'techs',
      items: [
        {
          name: 'Will Bowdler',
          editCase: 'update',
          alterCols: [
            {
              col: 'name',
              val: 'Will Bowdler',
            },
            {
              col: 'phone_number',
              val: '6015197970',
            },
          ],
        },
        {
          name: 'Ryan Hodges',
          editCase: 'delete',
        },
        {
          editCase: 'insert',
          newItemCols: ['name', 'email', 'phone_number'],
          newItemVals: ['Hunter', 'hunter@hunter.com', 2222222222],
        },
      ],
    }

    fetch('/api/edit/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }, [])

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
