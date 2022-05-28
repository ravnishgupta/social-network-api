const {User}  = require('../models');
const userController = {
    // get all pizzas
    getAllUsers(req, res) {
      User.find({})
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
}

module.exports = userController;
