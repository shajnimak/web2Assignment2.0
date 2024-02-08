const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser); // Новый роут для аутентификации
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
