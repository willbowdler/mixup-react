import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { DataProvider } from './context/DataContext'
import { RecordProvider } from './context/RecordContext'
import { HistoryProvider } from './context/HistoryContext'
import { EditProvider } from './context/EditContext'

import './styles/globals.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RecordProvider>
      <DataProvider>
        <HistoryProvider>
          <EditProvider>
            <App />
          </EditProvider>
        </HistoryProvider>
      </DataProvider>
    </RecordProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
