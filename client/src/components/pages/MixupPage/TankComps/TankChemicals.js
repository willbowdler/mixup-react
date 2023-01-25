import mixSty from '../../../../styles/MixInput.module.css'

import { useEffect, useState } from 'react'

import ChemSearch from './ChemSearch'
import ChemItem from './ChemItem'
import { useRec } from '../../../../context/RecordContext'

function TankChemicals({ tank }) {
  const { sentTo } = useRec()
  const [chems, setChems] = useState([])

  useEffect(() => {
    if (sentTo) setChems([])
  }, [sentTo])
  // BUG duplicates in chems
  return (
    <div className={mixSty.chemListCont}>
      {chems &&
        chems.map((c, i) => {
          return (
            <ChemItem
              setChems={setChems}
              mixVals={tank.mixVals}
              chemical={c}
              key={i}
            />
          )
        })}
      <ChemSearch tank={tank} chems={chems} setChems={setChems} />
    </div>
  )
}

export default TankChemicals
