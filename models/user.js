"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, lowercase: true, unique: true },
    passwordHash: String,
    salt: String
});
UserSchema.method("setPassword", function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
});
UserSchema.method("validatePassword", function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return (hash === this.passwordHash);
});
UserSchema.method("generateJWT", function (role) {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email,
        role: role
    }, 'SecretKey');
});
exports.default = mongoose.model('User', UserSchema);
