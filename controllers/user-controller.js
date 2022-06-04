const { request } = require('express');
const {User}  = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
          //console.log(err);
          res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
      User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(400).json(err));
    },
    getUserById({params}, res) {
      User.findOne({_id:params.id})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(400).json(err));
    },
    updateUser({body, params}, res) {
      User.findOneAndUpdate({_id:params.id}, body, { new: true, runValidators: true })
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({message: 'No user found with this id!'});
          return;
        }
        res.json(dbUser)
      })
      .catch(err => res.json(err));
    },
    deleteUser({params}, res) {
      User.findOneAndDelete({_id:params.id})
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({message: 'No user found with this id!'});
          return;
        }
        res.json(dbUser)
      })
      .catch(err => res.json(err));
    },
    async addFriend(req, res) {
      try {
        const friend = await User.create(req.body);
        const user = await User.findOneAndUpdate(
          {_id : req.params.id},
          {$push: {friends: friend._id}},
          {new:true}
        )
        res.json(user);
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
   
}

module.exports = userController;
