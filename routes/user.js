
const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authentication');

const api = express.Router();

api.get('/test', md_auth.ensureAuth,UserController.test);
api.post('/register',UserController.saveNewUser);
api.post('/login',UserController.loginUser);
api.get('/users/:id',md_auth.ensureAuth,UserController.getUserById);
api.get('/users',md_auth.ensureAuth,UserController.getAllUsers);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);

module.exports = api;