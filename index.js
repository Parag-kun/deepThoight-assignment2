const express = require('express')

const metaData = require('./routes/urlMetaData.js')

const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/urlMetaData', metaData)

app.listen(port, () => console.log('Server running at http://localhost:4000'))