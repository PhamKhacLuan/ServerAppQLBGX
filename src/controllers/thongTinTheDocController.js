const thongTinTheDocService = require('../services/thongTinTheDocService');

let handleCreateNewRFIDTag = async (req, res) => {
    let message = await thongTinTheDocService.createNewRFIDTag(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetAllRFIDTags = async (req, res) => {
    let message = await thongTinTheDocService.getAllRFIDTags();
    return res.status(200).json(message);
}

let handleDeleteRFIDTag = async (req, res) => {
    let message = await thongTinTheDocService.deleteRFIDTag(req.query.maTheDoc);
    return res.status(200).json(message);
}

let handleCheckRFIDTagExist = async (req, res) => {
    let message = await thongTinTheDocService.checkRFIDTagExist(req.query.maTheDoc);
    return res.status(200).json(message);
}

let handleGetRFIDTag = async (req, res) => {
    console.log(req.query.maTheDoc)
    let message = await thongTinTheDocService.getRFIDTag(req.query.maTheDoc);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateNewRFIDTag: handleCreateNewRFIDTag,
    handleGetAllRFIDTags: handleGetAllRFIDTags,
    handleDeleteRFIDTag: handleDeleteRFIDTag,
    handleCheckRFIDTagExist: handleCheckRFIDTagExist,
    handleGetRFIDTag: handleGetRFIDTag
}