import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './components/global/Nav'
import MixMain from './components/pages/MixupPage/MixMain'
import HistoryMain from './components/pages/HistoryPage/HistoryMain'
import EditsMain from './components/pages/EditsPage/EditsMain'

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        <Route exact path='/' element={<MixMain />}></Route>
        <Route exact path='/edits' element={<EditsMain />}></Route>
        <Route exact path='/mix-history' element={<HistoryMain />}></Route>
      </Routes>
    </Router>
  )
}

export default App
