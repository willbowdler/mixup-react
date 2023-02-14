import { useEffect } from 'react'

import mixSty from '../../../styles/Mix.module.css'

import Tank from './TankComps/Tank'
import MixHead from './MixHead'
import { useRec } from '../../../context/RecordContext'
import { useData } from '../../../context/DataContext'

function MixMain() {
  const { date, techSel, truckSel, tanks, submitRecord, sentTo } = useRec()
  const { setTechs, setTrucks } = useData()

  const { fetchData } = useData()

  useEffect(() => {
    const getData = async () => {
      const techData = await fetchData('technicians')
      const truckData = await fetchData('trucks')
      setTechs(techData)
      setTrucks(truckData)
    }
    getData()
  }, [])

  return (
    <div className={mixSty.mixCont}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitRecord(date, techSel, truckSel, tanks)
          fetch('/api/pdf/create_pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date,
              techSel,
              truckSel,
              tanks,
            }),
          })
        }}
        className={mixSty.mixForm}
      >
        <MixHead />
        <div className={mixSty.tankCont}>
          {tanks.map((t, i) => {
            if (i === 1) {
              return (
                <div key={i}>
                  <Tank tank={t} gals={t.gals} />
                  <div className={mixSty.buttonDiv}>
                    {sentTo ? <p> Mixups sent to {sentTo.tech}</p> : null}
                    <input
                      className={mixSty.mixSubmit}
                      type='submit'
                      value='Send'
                    />
                  </div>
                </div>
              )
            }
            return <Tank tank={t} key={i} gals={t.gals} />
          })}
        </div>

        {/* TODO create notes component and add this to record*/}
      </form>
    </div>
  )
}

export default MixMain
