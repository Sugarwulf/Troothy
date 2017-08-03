"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var politicianSchema = new mongoose.Schema({
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
exports.default = mongoose.model('Politician', politicianSchema);
