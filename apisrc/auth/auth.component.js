'strct';

import AuthenticationModel from './auth.model';

const AuthModel = new AuthenticationModel().getAuthSchema();

export default class Authentication {
    /**
     * Method is used to perform authentication of user.
     * @param {*} req - request parameter
     * @param {*} res - responses
     * @param {*} next - next middle ware call.
     */
    login(req, res, next) {
        const userName = req.body.username ? req.body.username : null;
        const mobileNumber = req.body.mobilenumber ? req.body.mobilenumber : null;
        const passWord = req.body.password ? req.body.password : null;

        if (userName && passWord) {
            AuthModel.find({ username: userName, password: passWord }).select('username password email mobilenumber').exec((err, resp) => {
                if (err) {
                    console.log(err);
                    res.send('Failed to fetch data');
                } else {
                    res.send(resp);
                }
            });
        } else if (mobileNumber && passWord) {
            AuthModel.find({ mobilenumber: mobileNumber, password: passWord }).select('username password email mobilenumber').exec((err, resp) => {
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
    register(req, res, next) {
        const register = new AuthModel({
            username: req.body.username,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            password: req.body.password,
        });

        const error = register.validateSync();

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
