import bcrypt from 'bcrypt'
import validator from 'validator'

import user from '../model/user'

import { encode } from '../../helpers/jwt'

const login = {
  create: (req, res) => {
    const { body } = req

    const email = body.email
    const password = body.password

    if(validator.isEmail(email)){
      user.findOneByEmail([email], result => {
        if(result.length <= 0){
          res.status(404).json({
            code: 404,
            message: `L'utilisateur n'a pas été trouvé.`
          })
        }

        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (err) throw err

          const token = encode({ uuid: result[0].uuid })

          if (isMatch) {
            res.status(200).json({
              code: 200,
              auth: true,
              token: token
            })
          } else {
            res.status(401).json({
              code: 401,
              auth: false,
              token: null
            })
          }
        })
      })
    }
  }
}

export default login
