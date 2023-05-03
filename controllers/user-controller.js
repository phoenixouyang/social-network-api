const { Users, Thoughts } = require('../models');

module.exports = {
    // get all users
  async getAllUsers(req, res) {
    try {
      const users = await Users.find();
      return res.json(users)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a singer user by _id
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.id })
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        if (!user) {
          return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
        }
        return res.json({student});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  
}
