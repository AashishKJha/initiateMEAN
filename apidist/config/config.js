'use strict';
'strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var envVarsSchema = _joi2.default.object({
    NODE_ENV: _joi2.default.string().allow(['dev', 'prod', 'test']).default('dev'),
    PORT: _joi2.default.number().default(4040),
    JWT_SECRET: _joi2.default.string().required().description('JWT Secret required to sign')
}).unknown().required();

var _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
    throw new Error('Config validation error: ' + error.message);
}

var config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET
};

exports.default = config;