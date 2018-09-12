import mongoose from 'mongoose';

export default class AuthenticationModel {
    /**
     * Contstructor of Authentication Model.
     */
    constructor() {
        this.getAuthSchema = this.getAuthSchema.bind(this);
    }

    /**
     * Method is used to return authentication model.
     */
    getAuthSchema() {
        const AuthSchema = mongoose.Schema;

        const authSchema = new AuthSchema({
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            mobilenumber: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            createdDate: { type: Date, default: Date.now() }
        });

        const authModel = mongoose.model('AuthModel', authSchema);
        return authModel;
    }
}
