const userService = require('../services/userService');
let handleGetAllUsers = async (req, res) => {
    let message = await userService.getAllUsers();
    return res.status(200).json(message);
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.CreateNewUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    let message = await userService.deleteUser(req.query.id);
    return res.status(200).json(message);
}
let handleUpdateUser = async (req, res) => {
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
}
let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Mất dữ liệu đầu vào '
        })
    }

    let userData = await userService.handleUserLogin(username, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    handleLogin: handleLogin
}