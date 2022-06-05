const { request } = require('express');
const res = require('express/lib/response');
const {User, Thought}  = require('../models');

const userController = {
  async getAllUsers(req, res) {
    try{  
      const users = await User.find({})
      .select('-__v');
      res.json(users);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser({ body }, res) {
    try{
      const user = await User.create(body)
      res.json(user)
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getUserById({params}, res) {
    try{
      const user = await User.findOne({_id:params.id})
      .select('-__v')
      res.json(user)
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser({body, params}, res) {
    try{
      const user = await User.findOneAndUpdate({_id:params.id}, body, { new: true, runValidators: true })
      res.json(user)
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
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
      const user = await User.findOneAndUpdate({_id : req.params.id},{$push: {friends: friend._id}},{new:true})
      res.json(user);
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  },
  async deFriend(req, res){
    try{
      const user = await User.findOneAndUpdate({_id : req.params.id},{$pull: {friends: req.params.friendId}},{new:true})
      res.json(user);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
module.exports = userController;
