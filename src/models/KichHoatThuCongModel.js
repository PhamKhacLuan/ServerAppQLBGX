const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const KichHoatCongThuCongModel = new Schema({
    idKHCTC: { type: Number },
    idNhanVien: { type: String, maxLength: 255 },
    thoiGianMoCong: { type: Date, default: Date.now() },
    anhUrl: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
})
KichHoatCongThuCongModel.plugin(AutoIncrement, { inc_field: 'idKHCTC' });
mongoose.plugin(slug);

module.exports = mongoose.model('KichHoatCongThuCongModel', KichHoatCongThuCongModel);