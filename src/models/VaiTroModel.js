const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const VaiTroModel = new Schema({
    idVaiTro: { type: Number },
    VaiTro: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
})

mongoose.plugin(slug);

module.exports = mongoose.model('VaiTroModel', VaiTroModel);