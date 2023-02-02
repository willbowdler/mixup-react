import { useEffect } from 'react'

import { useData } from '../../../context/DataContext'
import { useHist } from '../../../context/HistoryContext'

import histSty from '../../../styles/Hist.module.css'

function HistHead() {
  const { techs, setTechs, trucks, setTrucks, fetchData } = useData()
  const { setDateRange, dateRange, setTechSelHist, setTruckSelHist } = useHist()

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
    <div className={histSty.histHead}>
      <div className={histSty.dateCont}>
        <div>
          Records from: {''}
          <input
            type='date'
            onChange={(e) => {
              setDateRange((prevState) => {
                const newState = [e.target.value, prevState[1]]
                return newState
              })
            }}
            defaultValue={dateRange[0]}
          />
        </div>
        <div>
          To: {''}
          <input
            type='date'
            onChange={(e) => {
              setDateRange((prevState) => {
                const newState = [prevState[0], e.target.value]
                return newState
              })
            }}
            defaultValue={dateRange[1]}
          />
        </div>
      </div>
      <select
        onInput={(e) => {
          setTechSelHist(e.target.value)
        }}
        className={histSty.histSelect}
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
        onInput={(e) => {
          setTruckSelHist(e.target.value)
        }}
        className={histSty.histSelect}
      >
        <option value=''>--Chose a truck--</option>
        {trucks
          ? trucks.res.map((t, i) => (
              <option key={i} value={t.id}>
                {t.name}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}

export default HistHead
