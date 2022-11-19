import { Router } from 'express'
import { InvitationController } from './controllers/InvitationController'
import { SquadController } from './controllers/SquadController'
import { SquadUserController } from './controllers/SquadUserController'
import { UserController } from './controllers/UserController'

const routes = Router()

// USER ROUTES
routes.post('/user', new UserController().createUser)

// SQUAD ROUTES
routes.post('/squad', new SquadController().createSquad)

// SQUADUSER ROUTES
routes.post('/squad-user/:squadId/:userId', new SquadUserController().createSquadUser)

// INVITATION ROUTES
routes.post('/invitation/:squadId/:userId', new InvitationController().createInvitation)


export default routes