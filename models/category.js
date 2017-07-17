"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CategorySchema = new mongoose.Schema({
    name: String,
    politicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Politician' }]
});
exports.default = mongoose.model('Category', CategorySchema);
