const express = require('express');
const router = express.Router();

const thongTinTheDocController = require('../controllers/thongTinTheDocController');
const lichSuController = require('../controllers/lichSuController');
const userController = require('../controllers/userController');

router.post('/api/create-new-rfid-tag', thongTinTheDocController.handleCreateNewRFIDTag);
router.get('/api/get-all-rfid-tags', thongTinTheDocController.handleGetAllRFIDTags);
router.delete('/api/delete-rfid-tag', thongTinTheDocController.handleDeleteRFIDTag);

router.post('/api/create-new-history', lichSuController.handleCreateNewHistory);
router.get('/api/get-all-histories', lichSuController.handleGetAllHistories);
router.post('/api/login', userController.handleLogin);

module.exports = router;