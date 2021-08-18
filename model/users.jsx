const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const uniqueValidator = require('mongoose-unique-validator');

// var Float = require('mongoose-float').loadType(mongoose)

let Schema = mongoose.Schema;

let UserSchema = new Schema({
title: {
    type: String,
    trim: true,
    unique: false,
},
userName: {
    type: String,
    trim: true,
    unique: true,
    require: true,
},
firstName: {
    type: String,
    trim: true,
    unique: false,
    require: true,
},
lastName: {
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
password: {
    type: String,
    required: true,
    unique: false,
},
creation_date: {
    type: Date,
    default: Date.now
}
});

UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});



// UserSchema.pre('save', async (next) => {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();


//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     }); 
// });
     
// UserSchema.methods.comparePassword =(candidatePassword, cb) => {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

let User = mongoose.model("user", UserSchema);

module.exports = User;