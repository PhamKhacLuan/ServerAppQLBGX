const KichHoatThuCongService = require('../services/kichHoatThuCongService');
let handleGetAllManualActivation = async (req, res) => {
    let message = KichHoatThuCongService.getAllManualActivation();
    return res.status(200).json(message);
}
let handleCreateNewManualActivation = async (req, res) => {
    let message = KichHoatThuCongService.createNewManualActivation(req.body);
    return res.status(200).json(message);
}
let handleGetManualActivation = async (req, res) => {
    let message = KichHoatThuCongService.getManualActivation(req.query.idKHCTC);
    return res.status(200).json(message);
}
let handleGetImg = async (req, res) => {
    let message = await lichSuService.getImgIn(req.query.img_name);
    if (message.errCode !== 1) {
        res.writeHead(200, { 'Content-Type': message.contentType });
        res.end(message.data);
    } else {
        return res.status(200).json(message);
    }
}
module.exports = {
    handleGetAllManualActivation: handleGetAllManualActivation,
    handleCreateNewManualActivation: handleCreateNewManualActivation,
    handleGetManualActivation: handleGetManualActivation,
    handleGetImg: handleGetImg
}