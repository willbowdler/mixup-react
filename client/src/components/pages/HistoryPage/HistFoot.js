import histSty from '../../../styles/Hist.module.css'

import { useHist } from '../../../context/HistoryContext'

import HistPageOptions from './PageOptionsComps/HistPageOptions'

function HistFoot() {
  const { page, itemLimit, setItemLimit, numOfPages } = useHist()

  return (
    <div className={histSty.histFoot}>
      <HistPageOptions />
      <div>
        Item Limit: {''}
        <input
          className={histSty.limitInput}
          onChange={(e) => {
            if (!e.target.value) setItemLimit('')
            if (e.target.value) setItemLimit(parseInt(e.target.value))
          }}
          value={itemLimit}
          type='number'
          min={0}
        />
      </div>
    </div>
  )
}

//TODO set the numbers on the nav bar based on what length data you receive

export default HistFoot
