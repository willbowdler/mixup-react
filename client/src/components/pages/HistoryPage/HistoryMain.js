import { useEffect, useState } from 'react'

import histSty from '../../../styles/Hist.module.css'

import { useHist } from '../../../context/HistoryContext'

import HistHead from './HistHead'
import HistFoot from './HistFoot'
import HistItem from './ItemComps/HistItem'
import ItemColNames from './ItemComps/ItemColNames'

function HistoryMain() {
  const [items, setItems] = useState()

  const {
    returnHistory,
    dateRange,
    techSelHist,
    truckSelHist,
    page,
    itemLimit,
    setNumOfPages,
    setResultsLength,
  } = useHist()

  useEffect(() => {
    const getData = async () => {
      let searchCase
      const defineCase = () => {
        if (techSelHist && truckSelHist && dateRange[0] && dateRange[1]) {
          searchCase = 'filter'
        }
        if (!techSelHist && truckSelHist && dateRange[0] && dateRange[1]) {
          searchCase = 'truck_only'
        }
        if (techSelHist && !truckSelHist && dateRange[0] && dateRange[1]) {
          searchCase = 'tech_only'
        }
        if (!techSelHist && !truckSelHist && dateRange[0] && dateRange[1]) {
          searchCase = 'all'
        }
      }
      defineCase()

      const res = await returnHistory(
        dateRange,
        techSelHist,
        truckSelHist,
        itemLimit,
        page,
        searchCase
      )
      console.log(res)
      const itemData = res.resultRecords
      setItems(itemData)
      setNumOfPages(res.numOfPages)
      setResultsLength(res.resultsLength)
    }

    getData()
  }, [JSON.stringify(dateRange), techSelHist, truckSelHist, page, itemLimit])

  // NOTE what values do i need?
  // define number of pages LENGTH / limit
  // EXAMPLE : 58 ITEMS / 10 LIMIT = 11 pages (55) + 1 page (3)  so Math.ciel(resultsLength / Limit) = numOfPages
  // use

  return (
    <div className={histSty.histCont}>
      <form className={histSty.histForm}>
        <div className={histSty.histHeadItemCont}>
          <HistHead />
          <ItemColNames />
          {/* Just make sure the divs here and in the items have the same width and they should match up */}
          <div className={histSty.itemCont}>
            {items
              ? items.map((item, i) => <HistItem item={item} key={i} />)
              : null}
          </div>
        </div>
        <HistFoot />
      </form>
    </div>
  )
}

// NOTE the plan
// Have a history header bar component with filter options
// Create a SMALL footer with page options
// page options: prev and next page. How many items to display input. Number input
// Filter options: tech, truck, date
// Then filter HistoryItems in a flexCol. Put 10 items in the default. make it to where you can go up to 50. This would just extend the height of the histForm
// NOTE styling: just use the same colors from the MixMain

export default HistoryMain
