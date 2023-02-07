import express from 'express'

import compression from 'compression'
import cors from 'cors'

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 8080)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(compression())
    this.app.use(cors())
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Lithium auth backend is running at http://localhost:%d', this.app.get('port'))
    })
  }
}

const server = new Server()

server.start()
