const UserModel = require('../models/UserModel');
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
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: `Username đã được sử dụng. Vui lòng dùng username khác!!!`
                })
            } else {
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
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Không tìm thấy user`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Username không đúng. Vui lòng thử nhập lại đúng username";
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