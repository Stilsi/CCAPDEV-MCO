import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: String,

    profilepic: {
        type: String,
        default: './images/assets/default_user.png'   
    },

    bio: String,
});

const User = mongoose.model('user', userSchema);
export default User;