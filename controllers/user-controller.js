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

  // get a single user by _id
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        })
        if (!user) {
          return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
        }
        res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create user
  async createUser(req, res) {
    try {
      const user = await Users.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a single user by _id
  async updateUser(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
      }
      res.json(user)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a single user by _id, and all associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await Users.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
      }

      res.json({ message: 'User has been deleted'});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add a new friend to friend list
  async addFriend (req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true },
      )

      if (!user) {
        return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
      }
      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // remove a friend from friend list
  async deleteFriend (req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true },
      )
      
      if (!user) {
        return res.status(404).json({ message: 'Sorry, no user was found with that ID' })
      }
      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
