import { useContext, createContext, useState } from 'react'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [techs, setTechs] = useState(null)
  const [trucks, setTrucks] = useState(null)

  const fetchBoiler = async (route) => {
    const res = await fetch(route)
    const data = await res.json()
    return data
  }

  const fetchData = async (c) => {
    switch (c) {
      case 'techs':
        return fetchBoiler('/api/mix_data/techs')
      case 'trucks':
        return fetchBoiler('/api/mix_data/trucks')
      case 'chems':
        return fetchBoiler('/api/mix_data/chems')
      default:
        throw Error('This input did not run a fetch')
    }
  }
  return (
    <DataContext.Provider
      value={{ techs, setTechs, trucks, setTrucks, fetchData }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}
