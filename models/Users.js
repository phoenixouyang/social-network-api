const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        }
    },
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const Users = model('Users', userSchema);

module.exports = Users;