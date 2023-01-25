import histSty from '../../../../styles/Hist.module.css'

function ChemsInfo({ tanks }) {
  return (
    <div className={histSty.histChemVals}>
      {tanks.map((t, i) => {
        return (
          <div key={i} className={histSty.chemValsFlex}>
            <div>{t.gals} side:</div>
            <ul className={histSty.chemVals}>
              {t.chemsSel.map((c, i) => {
                return (
                  <li key={i}>
                    {c.name} Rate: {c.rate}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default ChemsInfo
