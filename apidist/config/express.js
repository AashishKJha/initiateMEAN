'use strict';
'strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('../index.route');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/**
 * Using Morgon Logger in Development Mode.
 */
app.use((0, _morgan2.default)('dev'));

/**
 * Using Body Parser to parse request body.
 */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.static(__dirname.concat('../../../dist/meanbasic')));

/**
 * Using Cookie Parser to parse cookie.
 */
app.use((0, _cookieParser2.default)());

/**
 * Using cors for cross origin communications.
 */
app.use((0, _cors2.default)());

/**
 * MongoDB Connection Using mongoose.
 */
_mongoose2.default.connect(process.env.MONGOURL + process.env.DBNAME, { useNewUrlParser: true }).then(function () {
  console.log('Connected to database');
}).catch(function (err) {
  console.log(err);
});

app.get('/', function (req, res) {
  console.log('index should run');
  res.sendFile(_path2.default.join(__dirname.concat('../../../dist/meanbasic/index.html')));
});

/**
 * Initial Route all request will receive here.
 */
app.use('/api', _index2.default);

/**
 * If route not found it will send status code 404.
 */
app.get('**', function (req, res, next) {
  res.sendStatus(404);
});

exports.default = app;