import { Router } from 'express'
import { MainController } from '../controllers/mainController'
import { verifyToken } from '../auth/authJwt'

export class MainRoutes {
  router: Router
  public mainController: MainController = new MainController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.get('/all', this.mainController.allAccess)
    this.router.get('/user', verifyToken, this.mainController.userBoard)
  }
}
