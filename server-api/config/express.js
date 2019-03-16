'strict';

import express from 'express';

import http from 'http';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';

import morgan from 'morgan';

import cors from 'cors';

import route from '../index.route';
import ChatServer from '../communication/chat/server';

export default class AppServer {
    constructor() {
        this.app = undefined;
        this.dbconnect = undefined;
        // this.server = http.createServer(this.app);
        this.createServer();
        this.mergeMiddleWares();
        this.init();
        this.createDBConnection();
    }

    createServer() {
        try {
            this.app = express();
        } catch (err) {
            console.log(err);
        }
    }

    createDBConnection() {
        /**
         * MongoDB Connection Using mongoose.
         */
        this.dbconnect = mongoose.connect(process.env.MONGOURL + process.env.DBNAME, { useNewUrlParser: true });
        this.dbconnect.then((conn) => {
            console.log(`Successfully connected to MongoDB URL : ${process.env.MONGOURL} and Database : ${process.env.DBNAME}`);
        }).catch((err) => {
            console.log(err);
        });
    }

    mergeMiddleWares() {
        /**
         * Using Morgon Logger in Development Mode.
         */
        this.app.use(morgan('dev'));

        /**
         * Using Body Parser to parse request body.
         */
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('dist/meanbasic'));

        /**
         * Using Cookie Parser to parse cookie.
         */
        this.app.use(cookieParser());

        /**
         * Using cors for cross origin communications.
         */
        this.app.use(cors());
    }

    getDBConnection() {
        return this.dbconnect;
    }

    init() {
        const chatServer = new ChatServer(http.Server(this.app));
        /**
         * Initial Route all request will receive here.
         */
        this.app.use('/api', route);

        this.app.use('/chat', chatServer.createChatServer);

        this.app.get('/chat/message', chatServer.sendMessage);

        /**
         * If route not found it will send status code 404.
         */
        this.app.get('**', (req, res, next) => {
            res.sendStatus(404);
        });
    }
}
