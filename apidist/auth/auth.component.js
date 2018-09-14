'use strict';
'strct';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./auth.model');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthModel = exports.AuthModel = new _auth2.default().getAuthSchema();

var Authentication = function () {
    function Authentication() {
        _classCallCheck(this, Authentication);
    }

    _createClass(Authentication, [{
        key: 'login',

        /**
         * Method is used to perform authentication of user.
         * @param {*} req - request parameter
         * @param {*} res - responses
         * @param {*} next - next middle ware call.
         */
        value: function login(req, res, next) {
            var userName = req.body.username ? req.body.username : null;
            var passWord = req.body.password ? req.body.password : null;

            if (userName && passWord) {
                AuthModel.findOne({ username: userName }, function (err, resp) {
                    console.log(err);
                    console.log(resp);
                    if (err) {
                        console.log(err);
                        res.status(404).send({
                            auth: 'Failed to get username',
                            message: err
                        });
                    } else if (resp) {
                        console.log(resp);
                        var passwordIsValid = _bcrypt2.default.compare(passWord, String(resp.password));
                        if (!passwordIsValid) {
                            res.status(401).send({ auth: false, message: 'Password Incorrect' });
                        } else {
                            var token = _jsonwebtoken2.default.sign({
                                username: userName
                            }, _config2.default.jwtSecret);
                            res.send({
                                auth: true,
                                token: token,
                                username: userName
                            });
                        }
                    } else {
                        res.status(404).send({
                            auth: false,
                            message: 'User Not Found'
                        });
                    }
                });
            }
        }

        /**
         * Method is used to perform Registration of user.
         * @param {*} req - request parameter
         * @param {*} res - responses
         * @param {*} next - next middle ware call.
         */

    }, {
        key: 'register',
        value: function register(req, res, next) {
            var hashedPassword = _bcrypt2.default.hashSync(req.body.password, 8);

            var register = new AuthModel({
                username: req.body.username,
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                password: hashedPassword
            });

            register.save(function (err) {
                if (err) {
                    console.log(err.errors);
                    res.send(err);
                } else {
                    res.send({
                        success: true,
                        message: 'Successfully Registered'
                    });
                }
            });
        }
    }]);

    return Authentication;
}();

exports.default = Authentication;