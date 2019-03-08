import CommonUtils from './common.utils';
import { commonConstantsInst } from '../constants/common.constants';

export default class ValidationUtils extends CommonUtils {
    constructor() {
        super();
    }

    static getDBValidationError(model) {
        const arr = [];
        if (model.errors) {
            const err = model.errors;
            Object.keys(err).forEach((key) => {
                const prop = err[key].properties;
                arr.push({
                    control: this.converter(key),
                    message: prop.message.replace('_', '').replace('Path', ''),
                    type: prop.type,
                    value: prop.value
                });
            });
        }
        return arr;
    }

    static getProperError(err) {
        const newErr = {};
        Object.keys(err).forEach((key) => {
            newErr[this.converter(key)] = err[key].properties;
        });
        return newErr;
    }

    static getErrorInstance(err) {
        return err.name;
    }

    static getError(err) {
        if (this.getErrorInstance(err) === commonConstantsInst.MongoValidationError) {
            return this.getDBValidationError(err.errors);
        }
        if (this.getErrorInstance(err) === commonConstantsInst.MongoError) {
            return err.errmsg;
        }
        return err;
    }
}
