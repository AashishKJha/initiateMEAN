'strict';

import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';

import morgan from 'morgan';

import cors from 'cors';

import path from 'path';


import route from '../index.route';

const app = express();

/**
 * Using Morgon Logger in Development Mode.
 */
app.use(morgan('dev'));

/**
 * Using Body Parser to parse request body.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname.concat('../../../dist/meanbasic')));

/**
 * Using Cookie Parser to parse cookie.
 */
app.use(cookieParser());

/**
 * Using cors for cross origin communications.
 */
app.use(cors());


/**
 * MongoDB Connection Using mongoose.
 */
mongoose.connect(process.env.MONGOURL + process.env.DBNAME, { useNewUrlParser: true }).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname.concat('../../../dist/meanbasic/index.html')));
});

/**
 * Initial Route all request will receive here.
 */
app.use('/api', route);

/**
 * If route not found it will send status code 404.
 */
app.get('**', (req, res, next) => {
    res.sendStatus(404);
});

export default app;
