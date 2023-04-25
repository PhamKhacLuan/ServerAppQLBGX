const ThongTinTheDocModel = require('../models/ThongTinTheDocModel');
const fs = require('fs');

let checkMaTheDoc = (maTheDoc) => {
    return new Promise(async (resolve, reject) => {
        try {
            let theDoc = await ThongTinTheDocModel.findOne({ maTheDoc: maTheDoc });
            if (theDoc) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewRFIDTag = (RFIDTagData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (RFIDTagData.maTheDoc) {
                let dataImg = RFIDTagData.anhXeVaoData;
                let binaryData = Buffer.from(dataImg, 'base64');
                var linkImg = RFIDTagData.anhXeVaoURL;
                var nameImg = linkImg + `.jpg`;
                fs.writeFileSync('src\\public\\img\\XeVao\\' + nameImg, binaryData);
                RFIDTagData.anhXeVaoURL = nameImg;
                check = await checkMaTheDoc(RFIDTagData.maTheDoc);
                if (check) {
                    resolve({
                        errCode: 1,
                        errMessage: `Mã thẻ đã được sử dụng. Vui lòng dùng thẻ đọc khác!!!`
                    })
                } else {
                    RFIDTagData.thoiGianXeVaoBai = Date.now();
                    const newRFIDTag = new ThongTinTheDocModel(RFIDTagData);
                    await newRFIDTag.save();
                    resolve({
                        errCode: 0,
                        message: `Lưu thông tin thẻ đọc thành công`
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Không nhận được mã thẻ đọc!!!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllRFIDTags = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let RFIDTags = await ThongTinTheDocModel.find({});
            resolve(RFIDTags);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteRFIDTag = (maTheDocData) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ThongTinTheDocModel.deleteOne({ maTheDoc: maTheDocData });
            resolve({
                errCode: 0,
                message: `Xóa thẻ đọc thành công`
            })
        } catch (e) {
            reject(e);
        }
    })
}

let checkRFIDTagExist = (maTheDoc) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkMaTheDoc(maTheDoc);
            if (check === true) {
                resolve({
                    message: "True"
                })
            } else {
                resolve({
                    message: "False"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewRFIDTag: createNewRFIDTag,
    getAllRFIDTags: getAllRFIDTags,
    deleteRFIDTag: deleteRFIDTag,
    checkRFIDTagExist: checkRFIDTagExist
}