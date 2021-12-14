const express = require('express')

const metaData = require('./routes/urlMetaData.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/urlMetaData', metaData)

app.listen(4000, () => console.log('Server running at http://localhost:4000'))