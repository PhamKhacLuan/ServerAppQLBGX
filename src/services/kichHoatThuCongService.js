const KichHoatThuCongModel = require('../models/KichHoatThuCongModel');

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

module.exports = {
    getAllManualActivation: getAllManualActivation,
}