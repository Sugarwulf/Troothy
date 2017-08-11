import mongoose = require ('mongoose');
import mongodb = require ('mongodb');


// let politicianSchema = new mongoose.Schema({
//   name: String,
//   title: String,
//   state: String,
//   spendMssg: String,
//   militMssg: String,
//   immigMssg: String,
//   scitechMssg: String,
//   eduMssg: String,
//   socialMssg: String,
//   envirMssg: String,
//   classMssg: String,
//   xFactorMssg: String,
//   troothyScore: Number
//
//
// });


let politicianSchema = new mongoose.Schema({
name: String,
title: String,
state: String,

  spendMssg:  Object,
  militMssg: Object,
  immigMssg: Object,
  scitechMssg: Object,
  eduMssg: Object,
  socialMssg: Object,
  envirMssg: Object,
  classMssg: Object,
  xFactorMssg: Object,
  hcMssg: Object,
  category: String
});


export default mongoose.model('Politician', politicianSchema);
