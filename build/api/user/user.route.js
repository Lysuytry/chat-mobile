'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./user.api');

var _user2 = require('./user.middleware');

var _firebase = require('../firebase/firebase.api');

const userRoute = (0, _express.Router)();

userRoute.get('/', _user.getUserList);
userRoute.post('/', _firebase.verifyToken2);
userRoute.post('/', _user2.validateUserCreating, _user.createUser);
userRoute.get('/:id', _user.getUserById);
userRoute.put('/:id', _user2.validateUserUpdating, _user.updateUser);
userRoute.delete('/:id', _user.deleteUser);

exports.default = userRoute;
//# sourceMappingURL=user.route.js.map