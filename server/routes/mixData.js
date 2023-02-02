const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/technicians', (req, res) => {
  db.query('SELECT * FROM technicians', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).json({ res: results })
  })
})
router.get('/trucks', (req, res) => {
  db.query('SELECT * FROM trucks', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).json({ res: results })
  })
})
router.get('/chemicals', (req, res) => {
  db.query('SELECT * FROM chemicals', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).json({ res: results })
  })
})
router.post('/chems_search', (req, res) => {
  if (req.body.input.toLowerCase() === 'all') {
    db.query('SELECT * FROM chemicals', (err, results) => {
      err
        ? res.status(500).json({ message: err.message })
        : res.status(200).json({ res: results })
    })
  }
  if (req.body.input.toLowerCase() !== 'all') {
    db.query(
      'SELECT * FROM chemicals WHERE name LIKE ?',
      [`${req.body.input}%`],
      (err, results) => {
        err
          ? res.status(500).json({ message: err })
          : res.status(200).json({ res: results })
      }
    )
  }
})
router.post('/post_records', (req, res) => {
  // TODO middleware that SMSs then sends the same data to be sent to mySQL server
  // TODO PDF --> SMS --

  db.query(
    'INSERT INTO mixup_records (date, technician, truck_id, tanks) VALUES (?, ?, (SELECT id FROM trucks WHERE name = ?), ?)',
    [
      req.body.date,
      req.body.techSel,
      req.body.truckSel.name,
      JSON.stringify(req.body.tanks),
    ],
    (err, results) => {
      err
        ? res.status(500).json({ message: err.message })
        : res.status(200).send(results)
    }
  )
})
router.get('/chem_records', (req, res) => {
  db.query('SELECT * FROM mixup_records', (err, results) => {
    err
      ? res.status(500).json({ message: err.message })
      : res.status(200).send(results)
  })
})

module.exports = router
