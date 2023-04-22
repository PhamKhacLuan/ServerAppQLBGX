const lichSuService = require('../services/lichSuService');
let handleCreateNewHistory = async (req, res) => {
    let message = await lichSuService.createNewHistory(req.body);
    return res.status(200).json(message);
}

let handleGetAllHistories = async (req, res) => {
    let message = await lichSuService.getAllHistories();
    return res.status(200).json(message);
}
let handleGetImgIn = async (req, res) => {
    let message = await lichSuService.getImgIn(req.query.img_name);
    if (message.errCode !== 1) {
        res.writeHead(200, { 'Content-Type': message.contentType });
        res.end(message.data);
    } else {
        return res.status(200).json(message);
    }
}
let handleGetImgOut = async (req, res) => {
    let message = await lichSuService.getImgOut(req.query.img_name);
    if (message.errCode !== 1) {
        res.writeHead(200, { 'Content-Type': message.contentType });
        res.end(message.data);
    } else {
        return res.status(200).json(message);
    }
}
let handleGetHistory = async (req, res) => {
    let message = await lichSuService.getHistory(req.query.idLichSu);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateNewHistory: handleCreateNewHistory,
    handleGetAllHistories: handleGetAllHistories,
    handleGetImgOut: handleGetImgOut,
    handleGetImgIn: handleGetImgIn,
    handleGetHistory: handleGetHistory
}