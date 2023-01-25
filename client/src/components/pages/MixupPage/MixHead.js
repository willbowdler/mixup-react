import { useRef, useEffect } from 'react'

import mixSty from '../../../styles/Mix.module.css'

import { useRec } from '../../../context/RecordContext'
import { useData } from '../../../context/DataContext'

function MixHead() {
  const { sentTo, setDate, setTechSel, setTruckSel } = useRec()
  const { techs, trucks } = useData()

  const curDate = new Date()
  const curDateString = curDate.toLocaleDateString('en-CA')

  const techInp = useRef()
  const truckInp = useRef()

  useEffect(() => {
    if (sentTo) {
      techInp.current.value = ''
      truckInp.current.value = ''
    }
  }, [sentTo])

  return (
    <div className={mixSty.mixHead}>
      <h2>
        Mixups for
        <input
          onChange={(e) => {
            console.log(e.target.value)
            setDate(e.target.value)
          }}
          defaultValue={curDateString}
          className={mixSty.mixHeadDate}
          type='date'
        />
      </h2>
      <select
        ref={techInp}
        onInput={(e) => {
          setTechSel(e.target.value)
        }}
        className={mixSty.mixSelect}
      >
        <option value=''>--Choose a technician--</option>
        {techs
          ? techs.res.map((t, i) => (
              <option key={i} value={t.name}>
                {t.name}
              </option>
            ))
          : null}
      </select>
      <select
        ref={truckInp}
        onInput={(e) => {
          setTruckSel(JSON.parse(e.target.value))
        }}
        className={mixSty.mixSelect}
      >
        <option value=''>--Chose a truck--</option>
        {trucks
          ? trucks.res.map((t, i) => (
              <option key={i} value={JSON.stringify(t)}>
                {t.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}

export default MixHead
