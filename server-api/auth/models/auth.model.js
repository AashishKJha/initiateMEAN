import mongoose from 'mongoose';
import CommonModel from '../../common/models/common.model';
import { commonConstantsInst } from '../../common/constants/common.constants';

class AuthModel extends CommonModel {
    /**
     * Contstructor of Authentication Model.
     */
    constructor() {
        super(Date.now(), Date.now());
        this.email = {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        };
        this.mobile_number = {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10
        };
        this.password = {
            type: String,
            required: true,
        };
        this.first_name = {
            type: String,
            required: true,
            maxlength: 30
        };
        this.middle_name = {
            type: String,
            required: false,
            maxlength: 30
        };
        this.last_name = {
            type: String,
            required: true,
            maxlength: 30
        };
        this.date_of_birth = {
            type: Date,
            required: false
        };
        this.user_type = {
            type: String,
            required: true,
            default: commonConstantsInst.USER_USER_TYPE
        };
    }

    /**
     * Method is used to return authentication model.
     */
    getAuthModel(auth) {
        return mongoose.model('UserModel', new mongoose.Schema(auth));
    }
}

const auth = new AuthModel();
export default auth.getAuthModel(auth);
