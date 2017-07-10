import mongoose = require ('mongoose');
import mongodb = require ('mongodb');


let politicianSchema = new mongoose.Schema({
  name: String,
  title: String,
  state: String
});

export default mongoose.model('Politician', politicianSchema);
