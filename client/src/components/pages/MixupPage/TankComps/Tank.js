import mixSty from '../../../../styles/Mix.module.css'
import TankInOutput from './TankInOutput'
import TankChemicals from './TankChemicals'

import { useRec } from '../../../../context/RecordContext'

function Tank({ tank, gals }) {
  const { truckSel } = useRec()

  return (
    <div className={mixSty.tank}>
      <div className={mixSty.tankHead}>
        <h1>
          {truckSel.gallon_type &&
          truckSel.gallon_type !== 300 &&
          tank.gals !== 100
            ? truckSel.gallon_type
            : gals}
        </h1>
        <div className={mixSty.tankNeeds}>
          <h4>Mixing Gallons:</h4>
          <input
            onChange={(e) => {
              e.target.value = tank.mixVals.tankNeedsG
            }}
            value={tank.mixVals.tankNeedsG}
            type='text'
          />
        </div>
      </div>
      <TankInOutput
        tank={tank}
        gals={
          truckSel.gallon_type && truckSel.gallon_type !== 300 && gals !== 100
            ? parseInt(truckSel.gallon_type)
            : gals
        }
      />{' '}
      {/* TODO add change gals functionality to update vals*/}
      <TankChemicals tank={tank} />
    </div>
  )
}

// TODO change background color of TANK on the basis of which truck is selected
// MAYBE create error messages for faulty inputs if needed (max-limit is exceded)
// US User can select from a series of chemical presets that autofills the chemicals in the tank component based on which preset they select

export default Tank
