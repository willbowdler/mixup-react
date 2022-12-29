const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/get_records', (req, res) => {
  if ((req.body.case = 'all')) {
    db.query(
      'SELECT * FROM `mixup_records` WHERE `date` BETWEEN ? and ? LIMIT ?',
      [req.body.dateRange[0], req.body.dateRange[1], req.body.itemLimit],
      (err, results) => {
        err
          ? res.status(500).json({ message: err.message })
          : res.status(200).json({ res: results })
      }
    )
  }

  if ((req.body.case = 'filter')) {
    // TODO make sure this returns the right info. Slice logic should work
    db.query(
      'SELECT * FROM `mixup_records` WHERE `date` BETWEEN ? and ? AND `technician` = ? AND `truck` = ?',
      [
        req.body.dateRange[0],
        req.body.dateRange[1],
        req.body.techHist,
        req.body.truckHist,
      ],
      (err, results) => {
        if (err) res.status(500).json({ message: err.message })
        if (!err) {
          const page = req.body.page
          const limit = req.body.itemLimit
          const resultsLength = results.length // TODO use this to decide how many page number options are rendered on the front end

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

          res.status(200).json({
            resultRecords: resultRecords,
            resultsLength: resultsLength,
          })
        }
      }
    )
  }
})

module.exports = router
