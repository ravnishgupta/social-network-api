const {Thought, Reaction}  = require('../models');
const {User}  = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
          res.status(400).json(err);
        });
    },
    async createThought(req, res) {
        try {
          const newThought = await Thought.create(req.body)
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId}, 
            { $push : { thoughts: newThought._id }},
            { new: true}
          );
          res.json(newThought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    updateThought({body, params}, res) {
        Thought.findOneAndUpdate({_id:params.id}, body, { new: true, runValidators: true })
        .then(dbThought => {
          if (!dbThought) {
            res.status(404).json({message: 'No thought found with this id!'});
            return;
          }
          res.json(dbThought)
        })
        .catch(err => res.json(err));
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .then(dbThought => res.json(dbThought))
        .catch(err => res.status(400).json(err));
    },

    // deleteThought(thoughtId) {
    //   Thought.findOneAndDelete({_id:thoughtId})
    //   .then(dbThought => {
    //     if (!dbThought) {
    //       res.status(404).json({message: 'No user found with this id!'});
    //       return;
    //     }
    //   })
    //   .catch(err => res.json(err));
    // },
    async createReaction(req, res) {
        try {
          const thoughtToReactTo = await Thought.findOneAndUpdate({ _id: req.params.id}, {$addToSet: {reactions: req.body}}, {new: true});
          if (!thoughtToReactTo) {
            res.status(404).json({
              message: 'Thought not found.',
            })
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
            res.status(404).json({
              message: 'Thought not found.',
            })
          }
          res.json(thoughtToRemoveReactionFrom);
    
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      
}

module.exports = thoughtController
