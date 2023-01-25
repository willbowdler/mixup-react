const express = require('express')
const router = express.Router()
const db = require('../database')

router.post('/get_records', (req, res) => {
  console.log(req.body)

  if (!req.body.itemLimit) req.body.itemLimit = 0
  if (req.body.case === 'all') {
    db.query(
      'SELECT * FROM `mixup_records` JOIN `trucks` ON truck_id = trucks.id WHERE `date` BETWEEN ? and ? ORDER BY date',
      [req.body.dateRange[0], req.body.dateRange[1]],
      (err, results) => {
        if (err) res.status(500).json({ messageFil: err.message })
        if (!err) {
          const page = req.body.page
          const limit = req.body.itemLimit
          const startIndex = (page - 1) * limit
          const endIndex = page * limit

          results.reverse()
          const resultRecords = results.slice(startIndex, endIndex)
          const resultsLength = results.length
          const numOfPages = Math.ceil(results.length / req.body.itemLimit)

          res.status(200).json({
            resultRecords,
            resultsLength,
            numOfPages,
          })
        }
      }
    )
  }

  if (req.body.case === 'truck_only') {
    db.query(
      'SELECT * FROM `mixup_records` JOIN `trucks` ON truck_id = trucks.id WHERE truck_id = ? AND `date` BETWEEN ? and ? ORDER BY date',
      [req.body.truckHist, req.body.dateRange[0], req.body.dateRange[1]],
      (err, results) => {
        if (err) res.status(500).json({ messageFil: err.message })
        if (!err) {
          const page = req.body.page
          const limit = req.body.itemLimit
          const startIndex = (page - 1) * limit
          const endIndex = page * limit

          const resultRecords = results.slice(startIndex, endIndex)
          const resultsLength = results.length
          const numOfPages = Math.ceil(results.length / req.body.itemLimit)

          res.status(200).json({
            resultRecords,
            resultsLength,
            numOfPages,
          })
        }
      }
    )
  }

  if (req.body.case === 'tech_only') {
    db.query(
      'SELECT * FROM `mixup_records` JOIN `trucks` ON truck_id = trucks.id WHERE `technician` = ? AND `date` BETWEEN ? and ? ORDER BY date',
      [req.body.techHist, req.body.dateRange[0], req.body.dateRange[1]],
      (err, results) => {
        if (err) res.status(500).json({ messageFil: err.message })
        if (!err) {
          const page = req.body.page
          const limit = req.body.itemLimit
          const startIndex = (page - 1) * limit
          const endIndex = page * limit

          const resultRecords = results.slice(startIndex, endIndex)
          const resultsLength = results.length
          const numOfPages = Math.ceil(results.length / req.body.itemLimit)

          res.status(200).json({
            resultRecords,
            resultsLength,
            numOfPages,
          })
        }
      }
    )
  }

  if (req.body.case === 'filter') {
    // TODO make sure this returns the right info. Slice logic should work
    db.query(
      'SELECT * FROM `mixup_records` JOIN `trucks` ON truck_id = trucks.id  WHERE truck_id = ? AND `date` BETWEEN ? and ? AND `technician` = ? ORDER BY date',

      [
        req.body.truckHist,
        req.body.dateRange[0],
        req.body.dateRange[1],
        req.body.techHist,
      ],
      (err, results) => {
        if (err) res.status(500).json({ messageFil: err.message })
        if (!err) {
          const page = req.body.page
          const limit = req.body.itemLimit
          // TODO use this to decide how many page number options are rendered on the front end

          // page = 1 limit = 20
          // startIndex = (1 - 1) * 20 === 0
          // endIndex = 1 * 20 === 20
          // results.slice(0, 20)
          // This will give me 0 - 19 in the array (20 items)

          // page = 2 limit = 20
          // startIndex = (2 - 1) * 20 === 20
          // endIndex = 2 * 20 === 40
          // result.slice(20, 40)
          // This will give me 20 - 39 in the array (20 items)

          const startIndex = (page - 1) * limit
          const endIndex = page * limit

          const resultRecords = results.slice(startIndex, endIndex)
          const resultsLength = results.length
          const numOfPages = Math.ceil(results.length / req.body.itemLimit)

          res.status(200).json({
            resultRecords,
            resultsLength,
            numOfPages,
          })
        }
      }
    )
  }
})

module.exports = router
