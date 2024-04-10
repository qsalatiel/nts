import express from 'express'
import errorhandler from 'errorhandler'
import 'dotenv/config'

import { Notification } from './handlers'
import { loggerMiddleware } from './utils/logger'

const app = express()

const port = process.env.PORT ?? 4000

app.use(loggerMiddleware)

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.get('/health', (req, res) => {
  res.send('healthy')
})

app.post('/notification', new Notification().handle)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
