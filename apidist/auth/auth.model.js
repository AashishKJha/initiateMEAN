'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticationModel = function () {
    /**
     * Contstructor of Authentication Model.
     */
    function AuthenticationModel() {
        _classCallCheck(this, AuthenticationModel);

        this.getAuthSchema = this.getAuthSchema.bind(this);
    }

    /**
     * Method is used to return authentication model.
     */


    _createClass(AuthenticationModel, [{
        key: 'getAuthSchema',
        value: function getAuthSchema() {
            var AuthSchema = _mongoose2.default.Schema;

            var authSchema = new AuthSchema({
                username: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                mobilenumber: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                },
                createdDate: { type: Date, default: Date.now() }
            });

            var authModel = _mongoose2.default.model('AuthModel', authSchema);
            return authModel;
        }
    }]);

    return AuthenticationModel;
}();

exports.default = AuthenticationModel;