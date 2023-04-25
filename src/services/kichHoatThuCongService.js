const KichHoatThuCongModel = require('../models/KichHoatThuCongModel');
const ThongTinTheDocModel = require('../models/ThongTinTheDocModel');
const UserModel = require('../models/UserModel');

let getAllManualActivation = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let MAs = await KichHoatThuCongModel.find({});
            resolve(MAs);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewManualActivation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.check == "ra") {
                let check = await ThongTinTheDocModel.findOne({ bienSo: data.bienSo })
                if (!check) {
                    resolve({
                        errCode: 1,
                        errMessage: `Không tồn tại biển số trong thông tin thẻ đọc`
                    })
                }
            }
            let dataImg = data.anhData;
            let binaryData = Buffer.from(dataImg, 'base64');
            var linkImg = data.anhURL;
            var nameImg = linkImg + ".jpg";
            if (data.check == "ra") {
                data.anhURL = "/XeRa/" + nameImg;
            } else {
                data.anhURL = "/XeVao/" + nameImg;
            }
            data.thoiGianMoCong = Date.now();
            await fs.writeFileSync('src/public/img' + data.anhURL, binaryData);
            const newKHCTC = KichHoatThuCongModel(data);
            await newKHCTC.save();
            resolve({
                errCode: 0,
                message: `Lưu thông tin KHCTC thành công`
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getManualActivation = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let MAs = await KichHoatThuCongModel.findOne({ idKHCTC: id });
            let user = await UserModel.findOne({ idNhanVien: Mas.idNhanVien })
            MAs.name = user.name;
            resolve(MAs);
        } catch (e) {
            reject(e);
        }
    })
}
let getImg = (img_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgName = "src/public/img" + img_name;
            fs.readFile(imgName, (err, data) => {
                if (err) {
                    resolve({
                        errMessage: 'load ảnh không thành công',
                        errCode: 1,
                    })
                }
                else {
                    resolve({
                        data: data,
                        contentType: 'image/jpeg'
                    })
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    getAllManualActivation: getAllManualActivation,
    createNewManualActivation: createNewManualActivation,
    getManualActivation: getManualActivation,
    getImg: getImg
}