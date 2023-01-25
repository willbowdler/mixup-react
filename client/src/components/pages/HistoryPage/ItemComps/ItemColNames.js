import histSty from '../../../../styles/Hist.module.css'

function ItemColNames() {
  return (
    <div className={histSty.itemColNames}>
      <div className={histSty.dateCol}>Date</div>
      <div className={histSty.techCol}>Technician</div>
      <div className={histSty.truckCol}>Truck</div>
      <div className={histSty.tankCol}>Tank Values</div>
      <div className={histSty.chemsCol}>Chemicals Used</div>
    </div>
  )
}

export default ItemColNames
