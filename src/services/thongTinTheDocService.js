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
                let dataImg = await fs.readFileSync(RFIDTagData.anhXeVaoData, function (err) {
                    if (err) {
                        resolve({
                            errCode: 3,
                            errMessage: `Có lỗi trong quá trình đọc dữ liệu ảnh`
                        })
                    }
                });
                var linkImg = RFIDTagData.anhXeVaoURL;
                var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
                await fs.writeFileSync('src\\public\\img\\XeVao' + nameImg, dataImg);
                RFIDTagData.anhXeVaoURL = 'src\\public\\img\\XeVao' + nameImg;
                check = await checkMaTheDoc(RFIDTagData.maTheDoc);
                if (check) {
                    resolve({
                        errCode: 1,
                        errMessage: `Mã thẻ đã được sử dụng. Vui lòng dùng thẻ đọc khác!!!`
                    })
                } else {
                    const newRFIDTag = new ThongTinTheDocModel(RFIDTagData);
                    await newRFIDTag.save();
                    resolve({
                        errCode: 0,
                        errMessage: `Lưu thông tin thẻ đọc thành công`
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
module.exports = {
    createNewRFIDTagL: createNewRFIDTag,
    getAllRFIDTags: getAllRFIDTags,
    deleteRFIDTag: deleteRFIDTag
}