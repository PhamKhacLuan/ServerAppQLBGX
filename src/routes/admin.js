const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const KichHoatThuCongController = require('../controllers/kichHoatThuCongController');

router.post('/api/create-new-user', userController.handleCreateNewUser);
router.get('/api/get-all-users', userController.handleGetAllUsers);
router.delete('/api/delete-user', userController.handleDeleteUser);
router.put('/api/update-user', userController.handleUpdateUser);

router.get('/api/get-all-manual-activation', KichHoatThuCongController.handleGetAllManualActivation);

module.exports = router;