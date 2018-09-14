'use strict';

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_express2.default.listen(_config2.default.port, function () {
  console.log('Server is running on '.concat(_config2.default.port));
});