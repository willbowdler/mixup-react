const express = require('express')
const router = express.Router()
const db = require('../database')

const useQuery = (query, dependencies) => {
  console.log(Array.isArray(dependencies))
  db.query(query, dependencies, (err, results) => {
    if (err) console.log(err)
    if (!err) {
      console.log('Data successfully changed')
    }
  })
}

// const constructQuery = (tableAndItems) => {
//   console.log(tableAndItems)
//   //NOTE tableAndItems is the object recieved from the body that determines the way the query is written
//   tableAndItems.items.map((it) => {
//     // NOTE the body object contains an array of item objects. Each item object contains values that will be used to query the database once. Each object represents a query
//     if (it.editCase === 'delete') {
//       // NOTE the query will be contructed in a certain way based upon which case is read in the item object. Each item will be contructed on the front end to be run through its respective if statement
//       const dependencies = [tableAndItems.table, it.name]
//       const query = `DELETE FROM ? WHERE name = ?`
//       useQuery(query, dependencies)

//       console.log(`Query: ${query} Dependencies: ${dependencies}`)
//     }
//     if (it.editCase === 'insert') {
//       const dependencies = [tableAndItems.table]
//       const query = `INSERT INTO ? (${it.newItemCols.map((col) => {
//         dependencies.push(col)
//         return `${it.newItemCols[0] === col ? '' : ' '}?`
//       })}) VALUES (${it.newItemVals.map((val) => {
//         dependencies.push(val)
//         return `${it.newItemVals[0] === val ? '' : ' '}?`
//       })})`
//       useQuery(query, dependencies)

//       console.log(
//         `Query: ${query} Dependencies: ${dependencies} ${typeof query}`
//       )
//     }
//     if (it.editCase === 'update') {
//       const dependencies = [tableAndItems.table]
//       const query = `UPDATE ? SET${it.alterCols.map((c) => {
//         dependencies.push(c.val)
//         return `${it.alterCols[-1] !== c ? ' ' : ''}${c.col} = ?`
//       })} WHERE name = ?`
//       dependencies.push(it.name)
//       useQuery(query, dependencies)

//       console.log(`Query: ${query} Dependencies: ${dependencies}`)
//     }
//   })
// }

// NOTE to the reader. the above code is mine. the below code is my code that was formatted differently by a friend in order to make the code cleaner and easier to understand.

/**
 * !! General Code Tips:
 * * Space your code out so it is easier to read
 * * write smaller chunks of code into many functions, it's easier to follow
 * * do your best to avoid inline commenting unless absolutely necessary, use function/variable naming to explain your code.
 * * Spend more time building the "right" data structure so that your code can function as seamlessly and elegantly as possible.
 * * Write better, concise comments
 *
 *
 *
 * !! Code specific tips/thoughts:
 * Consider change query from a map where you push to an array
 * to splitting/joining the array like:
 *
 * child.newItemCols.length ? ( "'" + child.newItemCols.join("', '") + "'" ) : ''
 *
 * This is where being dynamic is a little tricky and I would still opt for a destructured object rather than an array.
 *
 * If I understand correctly, you are mapping because you are trying to match values with the column position which is where the x === x ? : statement comes from. I think this is where your SQL syntax error is being created, but can't really know without setting the whole project up and seeing what it logs.
 */

/**
 * Dynamically generate SQL query based on
 * User interaction from client side interface
 *
 * @param object tableStructure
 *
 * @return void
 */
const constructQuery = (tableStructure) =>
  tableStructure.items.map((it) => delegateQuery(it, tableStructure))

/**
 * Delegate SQL action based on SQL method
 *
 * @param object
 * @param object
 *
 * @return void
 */
const delegateQuery = (child, parent) => {
  switch (child.editCase) {
    case 'delete':
      deleteItem(child, parent)
      break

    case 'insert':
      insertItem(child, parent)
      break

    case 'update':
      updateItem(child, parent)
      break
  }
}

/**
 * Delete single record.
 *
 * @param object child
 * @param object parent
 *
 * @return void
 */
const deleteItem = (child, parent) => {
  const dependencies = [child.name]

  const query = `DELETE FROM ${parent.table} WHERE name = ?`

  useQuery(query, dependencies)
}

/**
 * Insert single record.
 *
 * @param object child
 * @param object parent
 *
 * @return void
 */
const insertItem = (child, parent) => {
  const dependencies = []

  const query = `INSERT INTO ${parent.table} (${child.newItemCols.map((col) => {
    return `${child.newItemCols[0] === col ? '' : ' '}${col}`
  })}) VALUES (${child.newItemVals.map((val) => {
    if (!isNaN(val)) {
      dependencies.push(parseInt(val))
    } else dependencies.push(val)

    return `${child.newItemVals[0] === val ? '' : ' '}?`
  })})`
  console.log(dependencies)
  useQuery(query, dependencies)
}

/**
 * Update single record.
 *
 * @param object child
 * @param object parent
 *
 * @return void
 */
const updateItem = (child, parent) => {
  const dependencies = []

  const query = `UPDATE ${parent.table} SET${child.alterCols.map((c) => {
    dependencies.push(c.val)

    return `${child.alterCols[-1] !== c ? ' ' : ''}${c.col} = ?`
  })} WHERE name = ?`

  dependencies.push(child.name)

  useQuery(query, dependencies)
}

router.post('/query', (req, res) => {
  const yo = constructQuery(req.body)
})

module.exports = router
