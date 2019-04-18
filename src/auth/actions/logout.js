const logout = {
  read: (req, res) => {
    res.status(200).send({
      code: 200,
      auth: false,
      token: null
    })
  }
}

export default logout
