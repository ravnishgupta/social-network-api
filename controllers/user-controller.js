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
    }
}

module.exports = userController;
