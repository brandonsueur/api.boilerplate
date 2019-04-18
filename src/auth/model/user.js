import uuid from 'uuid'
import config from "../../../config/config"
import database from "../../../config/initializers/database"

const table = "users"

const user = {
  add: (data, cb) => {
    database.query(`INSERT INTO ${table} SET ?`, [data], error => {
      if(error) throw error

      cb()
    })
  },

  get: cb => {
    database.query(`SELECT * FROM ${table}`, (error, result) => {
      if(error) throw error

      cb(result)
    })
  },

  findOneByEmail: (data, cb) => {
    database.query(`SELECT uuid, password FROM ${table} WHERE email = ? LIMIT 1`, data, (error, result) => {
        if(error) throw error

        if (result.length === 0) {
            cb([])
        } else {
            cb(result)
        }
    })
  },

  findOneByUUID: (data, cb) => {
    database.query(`SELECT * FROM ${table} WHERE uuid = ? LIMIT 1`, data, (error, result) => {
        if(error) throw error

        if (result.length === 0) {
            cb([])
        } else {
            cb(result)
        }
    })
  },

  doesThisExist: (data, cb) => {
    database.query(`SELECT uuid FROM ${table} WHERE ?? = ? LIMIT 1`, data, (error, result) => {
        if (error) throw error

        if (result.length === 0) {
            cb(false)
        } else {
            cb(true)
        }
    })
  }
}

export default user
