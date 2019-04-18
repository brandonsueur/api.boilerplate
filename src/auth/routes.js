import { Router } from 'express'

import register from './actions/register'
import login from './actions/login'
import logout from './actions/logout'
import profile from './actions/profile'

const router = Router()

router.route('/register')
  .post(register.create)

router.route('/login')
  .post(login.create)

router.route('/logout')
  .get(logout.read)

router.route('/profile')
  .get(profile.read)

export default router
