'use strict';
'strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../auth/auth.component');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _auth.AuthModel;

var UserProfile = function () {
    function UserProfile() {
        _classCallCheck(this, UserProfile);
    }

    _createClass(UserProfile, [{
        key: 'getUserProfile',
        value: function getUserProfile(req, res, next) {
            var token = req.headers.authorization;
            if (!token) {
                res.status(401).send({ auth: false, message: 'No token provided.' });
            } else {
                _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret, function (err, decoded) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                    } else {
                        console.log(decoded);
                        User.find({ username: decoded.username }, function (userError, user) {
                            if (userError) {
                                res.status(500).send('There was a problem finding the user.');
                            } else if (!user) {
                                res.status(404).send('No user found.');
                            } else {
                                res.status(200).send(user);
                            }
                        });
                    }
                });
            }
        }
    }]);

    return UserProfile;
}();

exports.default = UserProfile;