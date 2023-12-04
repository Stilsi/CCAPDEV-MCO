import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
 });
 
 userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
 };
 
const User = mongoose.model('User', userSchema);

export default User;
