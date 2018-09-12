'use strict';

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config2.default.config();

_express2.default.listen(process.env.PORT, function () {
  console.log('Server is running on '.concat(process.env.PORT));
});