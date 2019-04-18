import uuid from 'uuid'
import ip from 'ip'
import bcrypt from 'bcrypt'
import validator from 'validator'

import user from '../model/user'

import { datetime } from '../../helpers/time'
import { encode } from '../../helpers/jwt'

const register = {
  create: (req, res) => {
    let isValid = false

    const { body } = req

    const first_name = body.first_name
    const last_name = body.last_name
    const email = body.email
    const password = body.password

    if(
      validator.isEmail(email) &&
      validator.isAlpha(first_name) &&
      validator.isAlpha(last_name)
    ){ isValid = true }

    if(isValid){
      user.findOneByEmail([email], result => {
        if (result.length > 0) {
          return res.status(409).json({
            code: 409,
            message: `L'adresse email existe déjà.`
          })
        }

        const newUser = {
          uuid: uuid.v4(),
          last_ip: ip.address(),

          first_name,
          last_name,
          email,
          password: bcrypt.hashSync(password, 10),

          last_login: datetime(),
          modified_at: datetime(),
          created_at: datetime()
        }

        user.add(newUser, (error) => {
          if(error) throw error

          const token = encode({ uuid: newUser.uuid })

          return res.status(200).json({
            code: 200,
            auth: true,
            message: `Utilisateur enregistré avec succès.`,
            token: token
          })
        })
      })
    } else {
      return res.status(500).json({
        code: 500,
        message: `Un problème est survenu lors de l'inscription.`
      })
    }
  }
}

export default register
