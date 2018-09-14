'strict';

import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';

import morgan from 'morgan';

import cors from 'cors';

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

/**
 * Initial Route all request will receive here.
 */
app.use('/', route);

/**
 * If route not found it will send status code 404.
 */
app.get('**', (req, res, next) => {
    res.sendStatus(404);
});

export default app;
