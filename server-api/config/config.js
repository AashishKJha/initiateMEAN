'strict';

import Joi from 'joi';

import dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['dev', 'prod', 'test'])
        .default('dev'),
    PORT: Joi.number()
        .default(4040),
    JWT_SECRET: Joi.string().required()
        .description('JWT Secret required to sign'),
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export class AppConfig {
    constructor() {
        this.env = envVars.NODE_ENV;
        this.port = envVars.PORT;
        this.jwtSecret = envVars.JWT_SECRET;
    }
}


export default new AppConfig();
