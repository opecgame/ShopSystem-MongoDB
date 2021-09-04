const { Schema, model} = require('mongoose');
const config = require("../settings.json")
const usersdata = Schema({
    id: String,
    money: {default: 0, type: String, require:true},
    topup: {default: 0, type: String ,request: true}
})
module.exports = model("users", usersdata);