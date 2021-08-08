const mongoose = require("mongoose");
// var Float = require('mongoose-float').loadType(mongoose)

let Schema = mongoose.Schema;

let UserInfoSchema = new Schema({
userName: {
    type: String,
    trim: true,
    unique: true,
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
password: {
    type: String,
    trim: true,
    unique: false,
},
creation_date: {
    type: Date,
    // default: Date.now
}
});

let UserInfo = mongoose.model("userInfo", UserInfoSchema);

module.exports = UserInfo;