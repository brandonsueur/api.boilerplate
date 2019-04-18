import user from '../model/user'

const profile = {
  read: (req, res) => {
    user.findOneByUUID([req.user.uuid], result => {
      if(!result.length > 0){
        res.status(404).json({
          code: 404,
          message: `L'utilisateur n'a pas été trouvé.`
        })
      } else {
        res.status(200).json({
          code: 200,
          auth: true,
          user: result[0]
        })
      }
    })
  }
}

export default profile
