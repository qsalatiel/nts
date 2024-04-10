import express from 'express'
import errorhandler from 'errorhandler'
import cors from 'cors'
import 'dotenv/config'

import { Notification } from './handlers'
import { loggerMiddleware } from './utils/logger'

const app = express()

const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS!)
const port = process.env.PORT ?? 4000

app.use(loggerMiddleware)

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.get('/health', cors({ origin: allowedOrigins }), (req, res) => {
  res.send('healthy')
})

app.post('/notification', new Notification().handle)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
