const express = require('express')

require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

const mixDataRoutes = require('./routes/mixData')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

// Routes
app.use('/api/mix_data', mixDataRoutes)

app.get('/api', (req, res) => {
  res.json({ message: process.env.DB_USER })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
