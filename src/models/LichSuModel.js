const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const LichSuModel = new Schema({
    bienSo: { type: String, maxLength: 255 },
    thoiGianXeVaoBai: { type: Date },
    anhXeVaoURL: { type: String, maxLength: 255 },
    thoiGianXeRaBai: { type: Date },
    anhXeRaURL: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, {
    _id: false
})

mongoose.plugin(slug);

module.exports = mongoose.model('LichSuModel', LichSuModel);