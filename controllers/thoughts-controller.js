const { json } = require('express/lib/response');
const {Thought, Reaction}  = require('../models');
const {User}  = require('../models');

const thoughtController = {
    // get all thoughts
  async getAllThoughts(req, res) {
    try{  
      const thoughts = await Thought.find({})
      .select('-__v');
      res.json(thoughts);
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body)
      const user = await User.findOneAndUpdate({ _id: req.body.userId}, {$push : { thoughts: newThought._id }},{ new: true});
      res.json(newThought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  async updateThought({body, params}, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id:params.id}, body, { new: true, runValidators: true })
      if (body.userId) {
        const user = await User.findOneAndUpdate({_id:body.userId},{$push : {thoughts : params.id}},{new:true})}
        res.json(thought);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },
  async deleteThought({params},res) {
    try{
      const theThought = await Thought.findOneAndDelete({_id:params.id})
      const user = await User.findOneAndUpdate({thoughts: {_id:params.id}}, {$pull: {thoughts:params.id}}, {new:true})
      res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  async getThoughtById({params}, res) {
    try{
      const thought = await Thought.findOne({_id:params.id})
      res.json(thought);
    }
    catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const thoughtToReactTo = await Thought.findOneAndUpdate({ _id: req.params.id}, {$addToSet: {reactions: req.body}}, {new: true});
        if (!thoughtToReactTo) {
          res.status(404).json({message: 'Thought not found.'})
        }
        res.json(thoughtToReactTo);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thoughtToRemoveReactionFrom = await Thought.findOneAndUpdate({ _id: req.params.id},{$pull: {reactions: {_id: req.params.reactionId}}},{new: true});
      if (!thoughtToRemoveReactionFrom) {
        res.status(404).json({message: 'Thought not found.'})
      }
      res.json(thoughtToRemoveReactionFrom);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
}
module.exports = thoughtController
