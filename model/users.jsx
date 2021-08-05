const mongoose = require("mongoose");
// var Float = require('mongoose-float').loadType(mongoose)

let Schema = mongoose.Schema;

let UserSchema = new Schema({
title: {
    type: String,
    trim: true,
    unique: false,
},
name: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
address: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
countryCode: {
    type: Number,
    unique: false,
    require: true,
},
phoneNumber: {
    type: Number,
    unique: false,
    require: true,
},
email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter valid e-mail address"]
},
bank_name: {
    type: String,
    trim: true,
    unique: false,
},
bank_account_number: {
    type: Number,
    trim: true,
    unique: true,
},
bvn: {
    type: Number,
    trim: true,
    unique: false,
},
system_account_number: {
    type: Number,
    trim: true,
    unique: true,
},
accountBalance: {
    type: {decimal:mongoose.Types.Decimal128},
    trim: true,
    unique: false,
},
creation_date: {
    type: Date,
    default: Date.now
}
});

let User = mongoose.model("user", UserSchema);

module.exports = User;