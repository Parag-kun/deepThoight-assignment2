const router = require("express").Router()
const request = require('request-promise')
const { parse } = require('node-html-parser')

const trim = str => str.slice(str.indexOf('h'), str.length - 1)

router.post('/', async (req, res) => {
    const metaData = {}
    const response = await request(req.body.uri)
    const root = parse(response.toString())

    root.querySelectorAll('meta[property^="og:"]').forEach(element => {
        metaData[element._attrs.property] = element._attrs.content
    })

    if (Object.keys(metaData).length === 0) {
        metaData.title = root.querySelector('title').textContent
        metaData.description = root.querySelector('meta[name="description"]')._attrs.content
        metaData.images = root.querySelectorAll('img[src^="https://"]').map(({ rawAttrs }) => trim(rawAttrs.slice(rawAttrs.indexOf('src=')).split(' ')[0].split('\n')[0]))
    }

    res.json(metaData)
})

module.exports = router