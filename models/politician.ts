import mongoose = require ('mongoose');
import mongodb = require ('mongodb');


let politicianSchema = new mongoose.Schema({
  name: String,
  title: String,
  state: String,
  spendMssg: String,
  militMssg: String,
  immigMssg: String,
  scitechMssg: String,
  eduMssg: String,
  socialMssg: String,
  envirMssg: String,
  classMssg: String,
  xFactorMssg: String


});

export default mongoose.model('Politician', politicianSchema);
