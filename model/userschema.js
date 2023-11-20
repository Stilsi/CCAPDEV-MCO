import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true
    },
    profilePicture: {
    type: String
    },
    fullName: {
    type: String
    },
    membershipDate: {
    type: String
    },
    location: {
    type: String
    },
    descriptionTitle: {
    type: String
    },
    description: String
});

const User = mongoose.model('User', userSchema);

export default User;
