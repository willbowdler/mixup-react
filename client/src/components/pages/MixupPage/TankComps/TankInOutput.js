import { useRec } from '../../../../context/RecordContext'

import mixSty from '../../../../styles/MixInput.module.css'

function TankInOutput({ tank, gals }) {
  const record = useRec()
  const { truckSel, updateTanks } = record

  return (
    <div className={mixSty.inputCont}>
      <div
        style={{ border: `2px solid ${truckSel.primary_color}` }}
        className={mixSty.tankRowFrst}
      >
        <h4>{gals} Has (G)</h4>
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'tankHasG', val)
          }}
          value={tank.mixVals.tankHasG}
          type='text'
          className={mixSty.hasG}
        />
      </div>
      <div
        style={{ border: `2px solid ${truckSel.primary_color}` }}
        className={mixSty.tankRowFrst}
      >
        <h4>{gals} Needs (Ft²)</h4>
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'tankNeedsFt', val)
          }}
          value={tank.mixVals.tankNeedsFt}
          type='text'
          className={mixSty.inputFrst}
        />
      </div>
      <div
        style={{ border: `2px solid ${truckSel.primary_color}` }}
        className={mixSty.tankRowFrst}
      >
        <h4>{gals} Needs (A)</h4>
        {/* NOTE autopop */}
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'tankNeedsA', val)
          }}
          value={tank.mixVals.tankNeedsA}
          type='text'
          className={mixSty.inputFrst}
        />
      </div>
      <div
        style={{ border: `2px solid ${truckSel.primary_color}` }}
        className={mixSty.tankRowFrst}
      >
        <h4>{gals} Needs (G)</h4>
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'tankNeedsG', val)
          }}
          value={tank.mixVals.tankNeedsG}
          type='text'
          className={mixSty.needsG}
        />
      </div>
      <div
        style={{ border: `2px solid ${truckSel.secondary_color}` }}
        className={mixSty.tankRowScnd}
      >
        <h4>{gals} Mix (A)</h4>
        {/* NOTE autopop */}
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'toBeMixedA', val)
          }}
          value={tank.mixVals.toBeMixedA}
          type='text'
          className={mixSty.inputScnd}
        />
      </div>
      <div
        style={{ border: `2px solid ${truckSel.secondary_color}` }}
        className={mixSty.tankRowScnd}
      >
        {/* NOTE autopop */}
        <h4>{gals} Mix (G)</h4>
        <input
          onChange={(e) => {
            let val = parseInt(e.target.value)
            if (!val) val = 0
            updateTanks(gals, 'toBeMixedG', val)
          }}
          value={tank.mixVals.toBeMixedG}
          type='text'
          className={mixSty.inputScnd}
        />
      </div>
    </div>
  )
}

export default TankInOutput
