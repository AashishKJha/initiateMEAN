import CommonController from '../../common/controllers/common.controller';
import SecurityUtils from '../../common/security/utils/security.utils';
import AUTHMODEL from '../models/auth.model';
import { authConstantsInst } from '../constants/auth.constants';
import AuthErrorResponse from '../responses/auth.errorResponse';
import AuthSuccessResponse from '../responses/auth.successResponse';


class SignupController extends CommonController {
    /**
     * Method is used to perform Registration of user.
     * @param {*} req - request parameter
     * @param {*} res - responses
     * @param {*} next - next middle ware call.
     */
    static register(req, res, next) {
        const register = new AUTHMODEL({
            username: req.body.username,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            password: SecurityUtils.getEncryptedPassword(req.body.password),
        });

        register.save((err) => {
            if (err) {
                res.status(500).send(
                    new AuthErrorResponse(authConstantsInst.INTERNAL_SERVER_ERROR, 404)
                );
            } else {
                res.send(new AuthSuccessResponse({
                    success: true,
                    message: req.body.email.concat(authConstantsInst.SUCCESSFULLY_REGISTERED)
                }));
            }
        });
    }
}

export default SignupController;
