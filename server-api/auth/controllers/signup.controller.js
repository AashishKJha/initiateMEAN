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
            first_name: req.body.firstName,
            middle_name: req.body.middleName,
            last_name: req.body.lastName,
            date_of_birth: req.body.dateOfBirth,
            email: req.body.email,
            mobile_number: req.body.mobilenumber,
            password: SecurityUtils.getEncryptedPassword(req.body.password)
        });

        register.save((err) => {
            console.log(err);
            if (err) {
                res.status(500).send(
                    new AuthErrorResponse(err, 500)
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
