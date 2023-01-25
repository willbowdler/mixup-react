import { useState, useContext, createContext } from 'react'

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
  // NOTE i am going to set my pagingation values here and send them throughout the history component from this context
  const curDate = new Date()
  const dateThirty = new Date()
  dateThirty.setDate(curDate.getDate() - 30)

  const thirtyDaysAgo = dateThirty.toLocaleDateString('en-CA')
  const [dateRange, setDateRange] = useState([
    thirtyDaysAgo,
    curDate.toLocaleDateString('en-CA'),
  ])

  const [page, setPage] = useState(1)
  const [itemLimit, setItemLimit] = useState(15)
  const [numOfPages, setNumOfPages] = useState(null)
  const [resultsLength, setResultsLength] = useState(null)

  const [techSelHist, setTechSelHist] = useState(null)
  const [truckSelHist, setTruckSelHist] = useState(null)

  const returnHistory = async (date, tech, truck, limit, page, histCase) => {
    const body = {
      // NOTE set a default date range

      dateRange: date,
      techHist: tech,
      truckHist: truck,
      itemLimit: limit,
      page: page,
      case: histCase,
    }

    const res = await fetch('/api/paginate/get_records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = res.json()
    return data
  }

  const [pageNumsVis, setPageNumsVis] = useState({
    lastIndex: 9,
    numsVis: [],
  })
  const [startAndEnd, setStartAndEnd] = useState({
    start: 1,
    end: 10,
    case: 'increase',
  })

  const returnPageVals = (curPage) => {
    if (curPage === startAndEnd.start && curPage > 1) {
      setStartAndEnd((prevState) => {
        return {
          start: prevState.start - 10,
          end: prevState.start,
          case: 'decrease',
        }
      })
    }
    if (curPage === startAndEnd.end) {
      setStartAndEnd((prevState) => {
        return {
          start: prevState.end,
          end: prevState.end + 10,
          case: 'increase',
        }
      })
    }
  }

  const returnPageNumsVis = () => {
    // const numOfPages = Math.ceil(resultsLength / itemLimit)
    const numsList = []
    let lastNum

    switch (startAndEnd.case) {
      case 'increase':
        for (
          let i = page;
          startAndEnd.start <= i && i <= startAndEnd.end;
          i++
        ) {
          numsList.push(i)
        }
        lastNum = numsList.slice(-1)

        // NOTE if lastNum is less than 10 dont set it

        setPageNumsVis({
          lastIndex: numsList.indexOf(...lastNum),
          numsVis: numsList,
        })
        break
      case 'decrease':
        for (
          let i = page;
          startAndEnd.start <= i && i <= startAndEnd.end && i !== 0;
          i--
        ) {
          numsList.unshift(i)
        }
        lastNum = numsList.slice(-1)
        setPageNumsVis({
          lastIndex: numsList.indexOf(...lastNum),
          numsVis: numsList,
        })
        break
    }

    // render you pagenav with this array
  }
  return (
    <HistoryContext.Provider
      value={{
        returnHistory,
        returnPageVals,
        returnPageNumsVis,
        setDateRange,
        setPage,
        setItemLimit,
        setTechSelHist,
        setTruckSelHist,
        setNumOfPages,
        setResultsLength,
        startAndEnd,
        dateRange,
        techSelHist,
        truckSelHist,
        itemLimit,
        page,
        pageNumsVis,
        numOfPages,
        resultsLength,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export const useHist = () => {
  return useContext(HistoryContext)
}
