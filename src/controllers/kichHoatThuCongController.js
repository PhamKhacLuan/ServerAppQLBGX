const lichSuService = require('../services/lichSuService');
let handleGetAllManualActivation = async (req, res) => {
    let message = lichSuService.getAllManualActivation(req.body);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllManualActivation: handleGetAllManualActivation,
}