import { Router } from 'express'
import { InvitationController } from './controllers/InvitationController'
import { SquadController } from './controllers/SquadController'
import { SquadUserController } from './controllers/SquadUserController'
import { UserController } from './controllers/UserController'

const routes = Router()

// USER ROUTES
routes.get('/users', new UserController().getUsers)
routes.get('/user/email', new UserController().getUserByEmail)
routes.post('/user', new UserController().createUser)

// SQUAD ROUTES
routes.get('/squads', new SquadController().getSquads)
routes.post('/squad', new SquadController().createSquad)

// SQUADUSER ROUTES
routes.get('/squads-users', new SquadUserController().getSquadsUsers)
routes.post('/squad-user/:squadId/:userId', new SquadUserController().createSquadUser)

// INVITATION ROUTES
routes.get('/invitations', new InvitationController().getInvitations)
routes.post('/invitation/:squadId/:userId', new InvitationController().createInvitation)


export default routes