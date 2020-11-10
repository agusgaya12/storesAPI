const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoutes')
const addInventory = require('./routes/inventory/addInventory')
const getInventory = require('./routes/inventory/getInventory')
const editInventory = require('./routes/inventory/editInventory')
const addStores = require('./routes/stores/addStores')
const getStores = require('./routes/stores/getStores')
const deleteStores = require('./routes/stores/deleteStores')

const app = express()
app.use(bodyParser.json())
app.use(rootRoute)
app.use(registerRoute)
app.use(loginRoute)
app.use(addInventory)
app.use(getInventory)
app.use(editInventory)
app.use(addStores)
app.use(getStores)
app.use(deleteStores)

const port = 9090
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
})
