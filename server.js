const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const DATA_FILE = 'data.json'

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE))
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

app.get('/transactions', (req, res) => {
  res.json(readData())
})

app.post('/transactions', (req, res) => {
  const data = readData()
  data.push(req.body)
  writeData(data)
  res.json({ message: 'Saved' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
