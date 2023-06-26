import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'

const app = express()
const port = 3000

app.use(express.json())
app.use('/users', usersRouter)
databaseService.connect()
app.use((err, req,res, next) => {
  console.log('Loi la', err.message);
  res.status(400).json({error: err.message});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
