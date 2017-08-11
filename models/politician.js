"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var politicianSchema = new mongoose.Schema({
    name: String,
    title: String,
    state: String,
    spendMssg: Object,
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
exports.default = mongoose.model('Politician', politicianSchema);
