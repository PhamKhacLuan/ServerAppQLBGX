const express = require('express');
const router = express.Router();

const thongTinTheDocController = require('../controllers/thongTinTheDocController');
const lichSuController = require('../controllers/lichSuController');
const userController = require('../controllers/userController');
const vaiTroController = require('../controllers/vaiTroController');
const kichHoatThuCongController = require('../controllers/kichHoatThuCongController');

router.post('/api/create-new-rfid-tag', thongTinTheDocController.handleCreateNewRFIDTag);
router.get('/api/get-all-rfid-tags', thongTinTheDocController.handleGetAllRFIDTags);
router.delete('/api/delete-rfid-tag', thongTinTheDocController.handleDeleteRFIDTag);
router.get('/api/check-rfid-tag-exist', thongTinTheDocController.handleCheckRFIDTagExist);

router.post('/api/create-new-history', lichSuController.handleCreateNewHistory);
router.get('/api/get-all-histories', lichSuController.handleGetAllHistories);
router.get('/api/get-img-out', lichSuController.handleGetImgOut);
router.get('/api/get-img-in', lichSuController.handleGetImgIn);
router.get('/api/get-history', lichSuController.handleGetHistory);

router.post('/api/login', userController.handleLogin);

router.post('/api/create-role', vaiTroController.handleCreateRole);
router.get('/api/get-role', vaiTroController.handleGetRole);

router.post('/api/create-new-manual-activation', kichHoatThuCongController.handleCreateNewManualActivation)

module.exports = router;