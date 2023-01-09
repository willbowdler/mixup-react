const express = require('express')
const router = express.Router()
const db = require('../database')

const useQuery = (query, dependencies) => {
  db.query(query, dependencies, (err, results) => {
    if (err) console.log(err.message)
    if (!err) {
      console.log('Data successfully changed')
    }
  })
}

const constructQuery = (tableAndItems) => {
  //NOTE tableAndItems is the object recieved from the body that determines the way the query is written
  tableAndItems.items.map((it) => {
    // NOTE the body object contains an array of item objects. Each item object contains values that will be used to query the database once. Each object represents a query
    if (it.editCase === 'delete') {
      // NOTE the query will be contructed in a certain way based upon which case is read in the item object. Each item will be contructed on the front end to be run through its respective if statement
      const dependencies = [tableAndItems.table, it.name]
      const query = `DELETE FROM ? WHERE name = ?`
      // useQuery(query, dependencies)

      console.log(`Query: ${query} Dependencies: ${dependencies}`)
    }
    if (it.editCase === 'insert') {
      const dependencies = [tableAndItems.table]
      const query = `INSERT INTO ? (${it.newItemCols.map((col) => {
        dependencies.push(col)
        return `${it.newItemCols[0] === col ? '' : ' '}?`
      })}) VALUES (${it.newItemVals.map((val) => {
        dependencies.push(val)
        return `${it.newItemVals[0] === val ? '' : ' '}?`
      })})`
      // useQuery(query, dependencies)

      console.log(`Query: ${query} Dependencies: ${dependencies}`)
    }
    if (it.editCase === 'update') {
      const dependencies = [tableAndItems.table]
      const query = `UPDATE ? SET${it.alterCols.map((c) => {
        dependencies.push(c.val)
        return `${it.alterCols[-1] !== c ? ' ' : ''}${c.col} = ?`
      })} WHERE name = ?`
      dependencies.push(it.name)
      // useQuery(query, dependencies)

      console.log(`Query: ${query} Dependencies: ${dependencies}`)
    }
  })
}

router.post('/query', (req, res) => {
  const yo = constructQuery(req.body)
  console.log(yo)
})

module.exports = router
