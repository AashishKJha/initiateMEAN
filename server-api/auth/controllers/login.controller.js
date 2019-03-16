import CommonController from '../../common/controllers/common.controller';
import AuthErrorResponse from '../responses/auth.errorResponse';
import AuthSuccessResponse from '../responses/auth.successResponse';
import TokeGenerator from '../../common/security/authentication/tokenGenerator';
import SecurityUtils from '../../common/security/utils/security.utils';
import { authConstantsInst } from '../constants/auth.constants';

import authModel from '../models/auth.model';
import AppException from '../../common/errors/common.exception';


class LoginController extends CommonController {
    constructor() {
        super();
    }

    /**
     * Method is used to perform authentication of user.
     * @param {*} req - request parameter
     * @param {*} res - responses
     * @param {*} next - next middle ware call.
     */
    static login(req, res, next) {
        const email = req.body.email ? req.body.email : null;
        const passWord = req.body.password ? req.body.password : null;

        if (email && passWord) {
            authModel.findOne({ email }, (err, authResp) => {
                if (err) {
                    next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE, new AuthErrorResponse(authConstantsInst.USER_NOT_FOUND)));
                } else if (authResp) {
                    const isAuth = new SecurityUtils(passWord).validatePassword(authResp.password);
                    isAuth.then((bool) => {
                        if (bool) {
                            res.status(200).send(new AuthSuccessResponse({
                                token: new TokeGenerator(true, authResp).getAccessToken(),
                                username: email
                            }));
                        } else {
                            next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE, new AuthErrorResponse(authConstantsInst.INCORRECT_PASSWORD)));
                        }
                    });
                } else {
                    next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE, new AuthErrorResponse(authConstantsInst.USER_NOT_FOUND, true)));
                }
            });
        }
    }
}

export default LoginController;
