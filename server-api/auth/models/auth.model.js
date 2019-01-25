import mongoose from 'mongoose';
import CommonModel from '../../common/models/common.model';

class AuthModel extends CommonModel {
    /**
     * Contstructor of Authentication Model.
     */
    constructor() {
        super(Date.now(), Date.now());
        this.username = { type: String, required: true };
        this.email = { type: String, required: true, unique: true };
        this.mobilenumber = { type: String, required: true, unique: true };
        this.password = { type: String, required: true };
    }

    /**
     * Method is used to return authentication model.
     */
    getAuthModel(auth) {
        return mongoose.model('AuthModel', new mongoose.Schema(auth));
    }
}

const auth = new AuthModel();
export default auth.getAuthModel(auth);
