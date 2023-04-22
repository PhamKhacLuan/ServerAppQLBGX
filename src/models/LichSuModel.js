const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const LichSuModel = new Schema({
    idLichSu: { type: Number },
    maTheDoc: { type: String, maxLength: 255 },
    bienSo: { type: String, maxLength: 255 },
    thoiGianXeVaoBai: { type: Date },
    anhXeVaoURL: { type: String, maxLength: 255 },
    thoiGianXeRaBai: { type: Date, default: Date.now },
    anhXeRaURL: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
})

LichSuModel.plugin(AutoIncrement, { inc_field: 'idLichSu' });
mongoose.plugin(slug);

module.exports = mongoose.model('LichSuModel', LichSuModel);