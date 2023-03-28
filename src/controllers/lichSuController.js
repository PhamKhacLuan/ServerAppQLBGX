const lichSuService = require('../services/lichSuService');
let handleCreateNewHistory = async (req, res) => {
    let message = lichSuService.createNewHistory(req.body);
    return res.status(200).json(message);
}

let handleGetAllHistories = async (req, res) => {
    let message = lichSuService.getAllHistories(req.body);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateNewHistory: handleCreateNewHistory,
    handleGetAllHistories: handleGetAllHistories
}