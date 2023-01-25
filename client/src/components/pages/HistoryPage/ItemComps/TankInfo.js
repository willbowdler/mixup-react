import histSty from '../../../../styles/Hist.module.css'

function TankInfo({ tanks }) {
  return (
    <div className={histSty.histTankVals}>
      {tanks.map((t, i) => {
        return (
          <div key={i} className={histSty.tankValsFlex}>
            <div>{t.gals} side:</div>
            <ul className={histSty.tankVals}>
              <li>Needed: {t.mixVals.tankNeedsG}</li>
              <li>Had: {t.mixVals.tankHasG}</li>
              <li>Mixed: {t.mixVals.toBeMixedG}</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default TankInfo
