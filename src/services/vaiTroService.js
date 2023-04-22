const VaiTroModel = require('../models/VaiTroModel');

let getRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === "All") {
                let roles = await VaiTroModel.find({});
                resolve(roles);
            } else {
                let role = await VaiTroModel.find({ idVaiTro: id });
                resolve(role);
            }
        } catch (e) {
            reject(e);
        }
    })
}


let createRole = (roleData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newRole = new VaiTroModel(roleData);
            await newRole.save();
            resolve({
                errCode: 0,
                errMessage: `Tạo vai trò thành công`
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createRole: createRole,
    getRole: getRole,
}