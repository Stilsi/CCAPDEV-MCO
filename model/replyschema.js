import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   content: {
       type: String,
       required: true
   }
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
