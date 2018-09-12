'use strict';
'strct';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _auth = require('./auth.model');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthModel = new _auth2.default().getAuthSchema();

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
            var mobileNumber = req.body.mobilenumber ? req.body.mobilenumber : null;
            var passWord = req.body.password ? req.body.password : null;

            if (userName && passWord) {
                AuthModel.find({ username: userName, password: passWord }).select('username password email mobilenumber').exec(function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.send('Failed to fetch data');
                    } else {
                        res.send(resp);
                    }
                });
            } else if (mobileNumber && passWord) {
                AuthModel.find({ mobilenumber: mobileNumber, password: passWord }).select('username password email mobilenumber').exec(function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.send('Failed to fetch data');
                    } else {
                        res.send(resp);
                    }
                });
            } else {
                res.send('Username Or Mobile Number Missing');
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
            var register = new AuthModel({
                username: req.body.username,
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                password: req.body.password
            });

            var error = register.validateSync();

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