"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var politicianSchema = new mongoose.Schema({
    name: String,
    title: String,
    state: String,
    spendMssg: {
        "Message": String,
        "Score": Number
    },
    militMssg: {
        "Message": String,
        "Score": Number
    },
    immigMssg: {
        "Message": String,
        "Score": Number
    },
    scitechMssg: {
        "Message": String,
        "Score": Number
    },
    eduMssg: {
        "Message": String,
        "Score": Number
    },
    socialMssg: {
        "Message": String,
        "Score": Number
    },
    envirMssg: {
        "Message": String,
        "Score": Number
    },
    classMssg: {
        "Message": String,
        "Score": Number
    },
    xFactorMssg: {
        "Message": String,
        "Score": Number
    },
    hcMssg: {
        "Message": String,
        "Score": Number
    },
    troothyScore: Number
});
exports.default = mongoose.model('Politician', politicianSchema);
