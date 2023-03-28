const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserModel = new Schema({
    _id: { type: Number },
    username: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 },
    idVaiTro: { type: Number },
    anhUrl: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, {
    _id: false
})

UserModel.plugin(AutoIncrement, { inc_field: '_id' });
mongoose.plugin(slug);

module.exports = mongoose.model('UserModel', UserModel);