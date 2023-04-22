const UserModel = require('../models/UserModel');
const VaiTroModel = require('../models/VaiTroModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findOne({ username: username });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let CreateNewUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUsername(userData.username);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: `Username đã được sử dụng. Vui lòng dùng username khác!!!`
                })
            } else {
                if (userData.anhData) {
                    let dataImg = userData.anhData;
                    let binaryData = Buffer.from(dataImg, 'base64');
                    var linkImg = userData.anhUrl;
                    var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
                    await fs.writeFileSync('src\\public\\img\\user\\' + nameImg, binaryData);
                    userData.anhUrl = 'src\\public\\img\\user\\' + nameImg;
                }
                userData.password = await hashUserPassword(userData.password);
                const newUser = new UserModel(userData);
                await newUser.save();
                resolve({
                    errCode: 0,
                    errMessage: `Tạo người dùng thành công`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await UserModel.find({});
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);
            if (isExist) {
                let user = await UserModel.findOne({ username: username });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        let role = await VaiTroModel.findOne({ idVaiTro: user.idVaiTro });
                        userData.message = {
                            errCode: 0,
                            message: "Đăng nhập thành công"
                        }
                        let userTemp = {
                            _id: user._id,
                            idNhanVien: user.idNhanVien,
                            username: user.username,
                            name: user.name,
                            vaiTro: {
                                idVaiTro: role.idVaiTro,
                                vaiTro: role.VaiTro
                            },
                            anhUrl: user.anhUrl
                        };
                        userData.user = userTemp;
                    } else {
                        userData.message = {
                            errCode: 3,
                            errMessage: 'Sai mật khẩu'
                        };
                    }
                } else {
                    userData.message = {
                        errCode: 2,
                        errMessage: 'Không tìm thấy user'
                    };
                }
            } else {
                userData.message = {
                    errCode: 1,
                    errMessage: 'Username không đúng. Vui lòng thử nhập lại đúng username'
                };
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await UserModel.deleteOne({ _id: id });
            resolve({
                errCode: 0,
                message: `Xóa người dùng thành công`
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUsername(userData.username);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: `Username đã được sử dụng. Vui lòng dùng username khác!!!`
                })
            } else {
                if (userData.password) {
                    userData.password = await hashUserPassword(userData.password);
                }
                if (userData.anhData) {
                    let dataImg = await fs.readFileSync(userData.anhData, function (err) {
                        if (err) {
                            resolve({
                                errCode: 3,
                                errMessage: `Có lỗi trong quá trình đọc dữ liệu ảnh`
                            })
                        }
                    });
                    var linkImg = userData.anhUrl;
                    var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
                    await fs.writeFileSync('src\\public\\img\\' + nameImg, dataImg);
                    userData.anhUrl = 'src\\public\\img\\user' + nameImg;
                }
                await UserModel.updateOne({ _id: userData.id }, userData)
                resolve({
                    errCode: 0,
                    message: `Cập nhật người dùng thành công`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    CreateNewUser: CreateNewUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,
    handleUserLogin: handleUserLogin
};