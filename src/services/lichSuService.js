const fs = require('fs');
const LichSuModel = require('../models/LichSuModel');
const ThongTinTheDocModel = require('../models/ThongTinTheDocModel');

let checkKhoaChinh = (bienSo, thoiGianXeVaoBai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lichSu = await LichSuModel.findOne({ bienSo: bienSo, thoiGianXeVaoBai: thoiGianXeVaoBai });
            if (lichSu) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewHistory = (historyData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkKhoaChinh(historyData.bienSo, historyData.thoiGianXeVaoBai);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: `Biển số và thời gian xe vào trên cùng một bảng ghi đã tồn tại!!!`
                })
            } else {
                let dataImg = historyData.anhXeRaData;
                let binaryData = Buffer.from(dataImg, 'base64');
                var linkImg = historyData.anhXeRaURL;
                var nameImg = linkImg + ".jpg";
                historyData.anhXeRaURL = nameImg;
                let dataTTTD = await ThongTinTheDocModel.findOne({ maTheDoc: historyData.maTheDoc });
                if (!dataTTTD) {
                    resolve({
                        errCode: 1,
                        errMessage: `Thẻ đọc này chưa được sử dụng`
                    })
                }
                historyData.thoiGianXeVaoBai = dataTTTD.thoiGianXeVaoBai;
                historyData.anhXeVaoURL = dataTTTD.anhXeVaoURL;
                historyData.thoiGianXeRaBai = Date.now();
                if (historyData.bienSo !== dataTTTD.bienSo) {
                    resolve({
                        errCode: 1,
                        errMessage: `Sai biển số`
                    })
                }
                await fs.writeFileSync('src\\public\\img\\XeRa\\' + nameImg, binaryData);
                const newHistory = new LichSuModel(historyData);
                await newHistory.save();
                await ThongTinTheDocModel.deleteOne({ maTheDoc: dataTTTD.maTheDoc })
                resolve({
                    errCode: 0,
                    errMessage: `Lưu lịch sử thành công`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHistories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let Histories = await LichSuModel.find({});
            resolve(Histories);
        } catch (e) {
            reject(e);
        }
    })
}
let getImgIn = (img_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgName = "src/public/img/XeVao/" + img_name;
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
let getImgOut = (img_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgName = "src/public/img/XeRa/" + img_name;
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
let getHistory = (idLichSu) => {
    return new Promise(async (resolve, reject) => {
        try {
            let history = await LichSuModel.findOne({ idLichSu: idLichSu });
            if (history) {
                resolve(history);
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy lịch sử đã lưu'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    createNewHistory: createNewHistory,
    getAllHistories: getAllHistories,
    getImgIn: getImgIn,
    getImgOut: getImgOut,
    getHistory: getHistory
}