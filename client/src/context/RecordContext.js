import { useState, useContext, createContext } from 'react'

const RecordContext = createContext()

export const RecordProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'))

  const [techSel, setTechSel] = useState(null)

  const [sentTo, setSentTo] = useState(false)

  const [truckSel, setTruckSel] = useState({
    primary_color: '#000',
    second_color: '#eee',
  })

  const defaultTankVals = [
    {
      gals: 300,
      mixVals: {
        tankHasG: 0,
        tankNeedsFt: 0,
        tankNeedsA: 0,
        tankNeedsG: 0,
        toBeMixedA: 0,
        toBeMixedG: 0,
      },
      chemsSel: [],
    },
    {
      gals: 100,
      mixVals: {
        tankHasG: 0,
        tankNeedsFt: 0,
        tankNeedsA: 0,
        tankNeedsG: 0,
        toBeMixedA: 0,
        toBeMixedG: 0,
      },
      chemsSel: [],
    },
  ]
  const [tanks, setTanks] = useState(defaultTankVals)

  const updateTanks = (gals, propToUpdate, newVal, chems) => {
    const tanksUpd = tanks.map((t) => {
      if (t.gals === gals) {
        // NOTE selecting the tank to update based on the gals input
        if (chems) {
          // NOTE if this is true run a different funtion to update the chemicals array of objects
          t.chemsSel = chems
        }
        for (const prop in t.mixVals) {
          // NOTE iterating through the mixVals object in the selected tank object
          if (prop === propToUpdate) {
            // NOTE if the current prop on the iteration cycle matches the prop input in the function that set the newVal input = the selected prop in the mixVals object
            t.mixVals[prop] = newVal
          }
        }
        updateTanksMath(t.mixVals, gals)
        return t
      }
      if (t.gals !== gals) return t
    })
    setTanks(tanksUpd)
  }

  const updateTanksMath = (mixVals, gals) => {
    // NOTE updating toBeMixedG

    let tankHasG = mixVals.tankHasG
    let tankNeedsG = mixVals.tankNeedsG

    if (tankNeedsG > gals) {
      // NOTE if tankNeedsG excedes gal value, set it back to its max and run the rest of the math the with max tankNeedsG value
      // BUG if a problem arises with the math, check here and watch the gals input, this code was a later addition the original perfectly working function
      mixVals.tankNeedsG = gals
      tankNeedsG = gals
    }

    if (tankNeedsG > tankHasG) {
      mixVals.toBeMixedG = tankNeedsG - tankHasG
    }
    if (tankNeedsG <= tankHasG) {
      mixVals.toBeMixedG = 0
    }

    // NOTE updating toBeMixedA
    mixVals.toBeMixedA = mixVals.toBeMixedG / 100

    // NOTE updating tankNeedsA
    const tankNeedsFt = mixVals.tankNeedsFt

    mixVals.tankNeedsA = parseFloat((tankNeedsFt / 43560).toFixed(2))

    return mixVals
  }

  const submitRecord = async (date, techSel, truckSel, tanks) => {
    const data = {
      date,
      techSel,
      truckSel,
      tanks,
    }

    const res = await fetch('/api/mix_data/post_records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const resData = await res.json()

    if (resData.insertId) {
      clearMix()
      setSentTo({ tech: techSel })
      setTimeout(setSentTo, 6000, false)
    }
  }

  const clearMix = () => {
    setTechSel(null)
    setTruckSel({
      prim_color: '#000',
      second_color: '#eee',
    })
    setDate(new Date().toLocaleDateString('en-CA'))
    setTanks(defaultTankVals)
  }

  return (
    <RecordContext.Provider
      value={{
        date,
        setDate,
        tanks,
        updateTanks,
        techSel,
        setTechSel,
        truckSel,
        setTruckSel,
        submitRecord,
        sentTo,
      }}
    >
      {children}
    </RecordContext.Provider>
  )
}

export const useRec = () => {
  return useContext(RecordContext)
}
