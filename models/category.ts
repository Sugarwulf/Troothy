import mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
  name: String,
  politicians: [{type: mongoose.Schema.Types.ObjectId, ref: 'Politician'}]
});

export default mongoose.model('Category', CategorySchema);
