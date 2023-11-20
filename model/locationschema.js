import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  link: String,
  defaultIcon: String,
  hoverIcon: String,
  restaurants: [String]
});

const Location = mongoose.model('Location', locationSchema);

export default Location;

