'strct';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import config from '../config/config';


import AuthenticationModel from './auth.model';

export const AuthModel = new AuthenticationModel().getAuthSchema();

export default class Authentication {
    /**
     * Method is used to perform authentication of user.
     * @param {*} req - request parameter
     * @param {*} res - responses
     * @param {*} next - next middle ware call.
     */
    login(req, res, next) {
        const userName = req.body.username ? req.body.username : null;
        const passWord = req.body.password ? req.body.password : null;

        if (userName && passWord) {
            AuthModel.findOne({ username: userName }, (err, resp) => {
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
                    const passwordIsValid = bcrypt.compare(passWord, String(resp.password));
                    if (!passwordIsValid) {
                        res.status(401).send({ auth: false, message: 'Password Incorrect' });
                    } else {
                        const token = jwt.sign({
                            username: userName
                        }, config.jwtSecret);
                        res.send({
                            auth: true,
                            token,
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
    register(req, res, next) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const register = new AuthModel({
            username: req.body.username,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            password: hashedPassword,
        });

        register.save((err) => {
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
}
