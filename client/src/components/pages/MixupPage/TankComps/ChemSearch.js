import { useState, useRef, useEffect } from 'react'
import { useRec } from '../../../../context/RecordContext'

import mixSty from '../../../../styles/MixInput.module.css'

function ChemSearch({ tank, chems, setChems }) {
  const { updateTanks } = useRec()
  const [searchVals, setSearchVals] = useState()

  const inputRef = useRef()

  const fetchChems = async (e) => {
    if (e.target.value !== '') {
      const res = await fetch('/api/mix_data/chems_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: e.target.value.trim() }),
      })
      const data = await res.json()
      setSearchVals(data)
    }

    if (e.target.value[0] === ' ' || e.target.value === '') {
      setSearchVals(null)
    }
  }

  const handleClick = (v) => {
    setChems([...chems, v])
    inputRef.current.value = ''
    setSearchVals(null)
  }

  useEffect(() => {
    updateTanks(tank.gals, null, null, chems)
    // TODO needs to cause chems to include the product value
  }, [chems])

  return (
    <div className={mixSty.chemSearch}>
      <div className={mixSty.inputContC}>
        <div className={mixSty.inputFlex}>
          <input ref={inputRef} onChange={fetchChems} type='text' />
          <div>Search for Chemicals</div>
        </div>
        {searchVals
          ? searchVals.res.map((v, i) => {
              return (
                <div
                  key={i}
                  className={mixSty.searchRes}
                  onClick={() => {
                    handleClick(v)
                  }}
                >
                  {v.name}
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default ChemSearch
