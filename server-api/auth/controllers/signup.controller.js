import CommonController from '../../common/controllers/common.controller';
import SecurityUtils from '../../common/security/utils/security.utils';
import AUTHMODEL from '../models/auth.model';
import { authConstantsInst } from '../constants/auth.constants';
import AuthErrorResponse from '../responses/auth.errorResponse';
import SignupDTO from '../dto/signup.dto';
import ValidationUtils from '../../common/utils/validation.utils';
import AppException from '../../common/errors/common.exception';


class SignupController extends CommonController {
    /**
     * Method is used to perform Registration of user.
     * @param {*} req - request parameter
     * @param {*} res - responses
     * @param {*} next - next middle ware call.
     */
    static register(req, res, next) {
        const signupDTO = new SignupDTO(req.body, Date.now(), Date.now());
        const register = new AUTHMODEL({
            first_name: signupDTO.getFirstName,
            middle_name: signupDTO.getMiddleName,
            last_name: signupDTO.getLastName,
            date_of_birth: signupDTO.getDateOfBirth,
            email: signupDTO.getEmail,
            mobile_number: signupDTO.getMobileNumber,
            password: SecurityUtils.getEncryptedPassword(signupDTO.getPassword)
        });
        AUTHMODEL.findOne({ email: signupDTO.getEmail }, (err, resp) => {
            if (err) {
                next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE,
                    new AuthErrorResponse(ValidationUtils.getError(err))));
            } else if (resp) {
                next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE,
                    new AuthErrorResponse(authConstantsInst.USER_ALREADY_EXIST)));
            } else {
                register.save((saveErr) => {
                    if (saveErr) {
                        next(new AppException(authConstantsInst.UNAUTHORIZED_ERROR_CODE,
                            new AuthErrorResponse(ValidationUtils.getError(saveErr))));
                    } else {
                        res.sendStatus(authConstantsInst.OK);
                    }
                });
            }
        });
    }
}

export default SignupController;
