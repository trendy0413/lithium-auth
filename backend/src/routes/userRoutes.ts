import { Router } from 'express'
import { UserController } from '../controllers/userController'

export class UserRoutes {
  router: Router
  public userController: UserController = new UserController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/signup', this.userController.registerUser)
    this.router.post('/signin', this.userController.authenticateUser)
  }
}
