const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({ 
    thoughtText: {
        type:String,
        required:true,
        minlength:1,
        maxlength:280
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;