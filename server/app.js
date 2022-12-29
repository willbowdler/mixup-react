const express = require('express')

require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

const mixDataRoutes = require('./routes/mixData')
const paginationRoutes = require('./routes/histPagination')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

// Routes
app.use('/api/mix_data', mixDataRoutes)
app.use('/api/paginate', paginationRoutes)

app.get('/api', (req, res) => {
  res.json({ message: process.env.DB_USER })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
