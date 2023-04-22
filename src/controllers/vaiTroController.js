const vaiTroService = require('../services/vaiTroService');
let handleCreateRole = async (req, res) => {
    let message = await vaiTroService.createRole(req.body);
    return res.status(200).json(message);
}
let handleGetRole = async (req, res) => {
    let message = await vaiTroService.getRole(req.query.id);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateRole: handleCreateRole,
    handleGetRole: handleGetRole
}