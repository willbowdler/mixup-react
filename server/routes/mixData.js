const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/techs', (req, res) => {
  db.query('SELECT * FROM `technicians`', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).json({ res: results })
  })
})
router.get('/trucks', (req, res) => {
  db.query('SELECT * FROM `trucks`', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).json({ res: results })
  })
})
router.get('/chems', (req, res) => {
  db.query('SELECT * FROM `chemicals`', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).send(results)
  })
})
router.get('/chem_records', (req, res) => {
  db.query('SELECT * FROM `mixup_records`', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).send(results)
  })
})

module.exports = router
