import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from "./model/userschema.js";

dotenv.config();

// Connect to your MongoDB Atlas database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function hashPasswords() {
 const unhashedUsers = await User.find({
  password: {
    $not: /^\$2[abyx]\$/
  }
 });

 for (let user of unhashedUsers) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
 }

 console.log('All unhashed passwords have been hashed and updated.');
}

hashPasswords().catch(console.error);
