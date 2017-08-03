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
  xFactorMssg: String,
  troothyScore: Number


});


// let politicianSchema = new mongoose.Schema({
// name: String,
// title: String,
// state: String,
//
//   spendMssg: {
// "Message": String,
// "Score": Number
// },
//   militMssg: {
// "Message": String,
// "Score": Number
// },
//  immigMssg: {
// "Message": String,
// "Score": Number
// },
//  scitechMssg: {
// "Message": String,
// "Score": Number
// },
//  eduMssg: {
// "Message": String,
// "Score": Number
// },
//  socialMssg: {
// "Message": String,
// "Score": Number
// },
//  envirMssg: {
// "Message": String,
// "Score": Number
// },
//  classMssg: {
// "Message": String,
// "Score": Number
// },
//  xFactorMssg: {
// "Message": String,
// "Score": Number
// },
//
// troothyScore: Number
// });


export default mongoose.model('Politician', politicianSchema);
