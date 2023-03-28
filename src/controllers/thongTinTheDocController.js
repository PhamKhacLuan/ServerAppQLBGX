const thongTinTheDocService = require('../services/thongTinTheDocService');

let handleCreateNewRFIDTag = async (req, res) => {
    let message = thongTinTheDocService.createNewRFIDTag(req.body);
    return res.status(200).json(message);
}

let handleGetAllRFIDTags = async (req, res) => {
    let message = thongTinTheDocService.getAllRFIDTags();
    return res.status(200).json(message);
}

let handleDeleteRFIDTag = async (req, res) => {
    let message = thongTinTheDocService.deleteRFIDTag(req.query.maTheDoc);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateNewRFIDTag: handleCreateNewRFIDTag,
    handleGetAllRFIDTags: handleGetAllRFIDTags,
    handleDeleteRFIDTag: handleDeleteRFIDTag
}