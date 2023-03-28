const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const ThongTinTheDocModel = new Schema({
    maTheDoc: { type: String, maxLength: 255 },
    bienSo: { type: String, maxLength: 255 },
    anhXeVaoURL: { type: String, maxLength: 255 },
    thoiGianXeVaoBai: { type: Date },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, {
    _id: false
})

mongoose.plugin(slug);

module.exports = mongoose.model('ThongTinTheDocModel', ThongTinTheDocModel);