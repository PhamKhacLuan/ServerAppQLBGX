const LichSuModel = require('../models/LichSuModel');

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

let saveImg = (data, anhUrl, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataImg = await fs.readFileSync(data, function (err) {
                if (err) {
                    resolve(false)
                }
            });
            var linkImg = anhUrl;
            var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
            await fs.writeFileSync(url + nameImg, dataImg);
            anhUrl = url + nameImg;
            resolve(anhUrl);
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
                historyData.anhXeRaURL = saveImg(historyData.anhXeRaData, historyData.anhXeRaURL, 'src\\public\\img\\XeRa');
                const newHistory = new LichSuModel(RFIDTagData);
                await newHistory.save();
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

module.exports = {
    createNewHistory: createNewHistory,
    getAllHistories: getAllHistories
}