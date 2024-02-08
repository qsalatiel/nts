import morgan from 'morgan'
import winston from 'winston'

const { format } = winston

const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(msg => {
      return `${msg.timestamp} [${msg.level}] ${msg.message}`
    })
  ),
  transports: [new winston.transports.Console({ level: 'http' })],
})

export const loggerMiddleware = morgan(
  ':http-version | :remote-addr :method :url :status :response-time ms',
  {
    stream: {
      write: message => logger.http(message.trim()),
    },
  }
)
