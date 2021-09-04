const { Schema, model} = require('mongoose');
const config = require("../settings.json")
const itemsdata = Schema({
    id: String,
    price: Number,
    info: String,
    sold: {default: false, type: Boolean ,request: true},
    username: String,
    password: String
})
module.exports = model("items", itemsdata);