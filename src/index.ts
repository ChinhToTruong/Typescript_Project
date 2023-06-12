import express from 'express'

const app = express()
const port = 3000

const myName = 'Chinh'

app.get('/', (req, res) => {
  res.send(`Hello ${myName}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})