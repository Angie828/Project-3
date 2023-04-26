const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
}, { collection : 'users' , toJSON: { virtuals: true }});

UserSchema.virtual('posts', {
    ref: 'posts',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

module.exports.UserSchema = UserSchema;