const { request } = require('express');
const {User, Thought}  = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .select('-__v')
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
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
    async deleteUser({params}, res) {
      try{
        const removeThoughts = await User.findOneAndUpdate({_id:params.id}, {$set : {thoughts:[]}}, {multi:true})
        const deleteUser = await User.findOneAndDelete({_id:params.id})
        res.json(deleteUser);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
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
    },
    async deFriend(req, res){
      try{
        const user = await User.findOneAndUpdate(
          {_id : req.params.id},
          {$pull: {friends: req.params.friendId}},
          {new:true},
        )
        res.json(user);
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    
    // async removeThought(req, res){
    //     try {
          
    //       const thought = await Thought.findOneAndDelete({_id : req.params.thoughtId})  

    //       const user = await User.findOneAndUpdate(
    //         {_id : req.params.id},
    //         {$pull : {thoughts : req.params.thoughtId}},
    //         {new:true}
    //       )
            
    //       res.json(user);
    //     }
    //     catch (err) {
    //       console.log(err);
    //       res.status(500).json(err);
    //     }
    //   }
}

module.exports = userController;
