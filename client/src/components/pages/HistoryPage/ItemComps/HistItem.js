import histSty from '../../../../styles/Hist.module.css'
import ChemsInfo from './ChemsInfo'

import TankInfo from './TankInfo'

function HistItem({ item }) {
  return (
    <div className={histSty.histItem}>
      <div className={histSty.dateCol}>
        {new Date(item.date).toLocaleDateString()}
      </div>
      <div className={histSty.techCol}>{item.technician}</div>
      <div className={histSty.truckCol}>
        <div
          className={histSty.truckColor}
          style={{
            borderRadius: '20px',
            backgroundColor: `${item.primary_color}`,
          }}
        >
          {item.name}
        </div>
      </div>
      <div className={histSty.tankCol}>
        <TankInfo tanks={item.tanks} />
      </div>
      <div className={histSty.chemsCol}>
        <ChemsInfo tanks={item.tanks} />
      </div>
      {/* TODO display a box with the tank size on it that you can click on that has the values of the tank on a drop down menu */}
    </div>
  )
}

export default HistItem
