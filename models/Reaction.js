const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({ 
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type:String,
        required:true,
        maxlength:280
    },
    username: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;