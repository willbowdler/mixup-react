import { useEffect } from 'react'

import histSty from '../../../../styles/Hist.module.css'
import { useHist } from '../../../../context/HistoryContext'

function HistPageOptions() {
  const {
    pageNumsVis,
    page,
    itemLimit,
    resultsLength,
    numOfPages,
    setNumOfPages,
    returnPageVals,
    returnPageNumsVis,
    setPage,
    startAndEnd,
  } = useHist()

  useEffect(() => {
    returnPageVals(page)
  }, [page])
  useEffect(() => {
    returnPageNumsVis()
  }, [startAndEnd])
  useEffect(() => {
    setNumOfPages((prevState) => {
      const newState = Math.ceil(resultsLength / itemLimit)
      return newState
    })
  }, [itemLimit])

  return (
    <div className={histSty.pageOptionsCont}>
      {pageNumsVis.numsVis.map((p, i) => {
        if (p > numOfPages) return
        return (
          <div key={i} className={histSty.pagePCont}>
            {i === 0 ? (
              <div
                className={histSty.nextPrevCont}
                onClick={() => {
                  setPage(p)
                  returnPageVals(p)
                }}
              >
                <div style={page === 1 ? { display: 'none' } : null}>
                  {'< '}
                </div>
                <p className={page === p ? histSty.pageSel : null}>{p}</p>
              </div>
            ) : null}
            {i !== 0 && i !== pageNumsVis.lastIndex ? (
              <p
                className={page === p ? histSty.pageSel : null}
                onClick={() => {
                  setPage(p)
                }}
              >
                {p}
              </p>
            ) : null}
            {i === pageNumsVis.lastIndex ? (
              <div
                className={histSty.nextPrevCont}
                onClick={() => {
                  setPage(p)
                  returnPageVals(p)
                }}
              >
                <p className={page === p ? histSty.pageSel : null}>{p}</p>
                <div>{' >'}</div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

// TODO i need to be able to select a value and pass it into the recordHist function as the page value
// NOTE probably dont need case val, but maybe

export default HistPageOptions
