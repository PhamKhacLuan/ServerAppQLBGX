const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const LichSuModel = new Schema({
    idNhanVien: { type: String, maxLength: 255 },
    thoiGianMoCong: { type: Date, default: Date.now() },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
})

mongoose.plugin(slug);

module.exports = mongoose.model('KichHoatCongThuCongModel', KichHoatCongThuCongModel);