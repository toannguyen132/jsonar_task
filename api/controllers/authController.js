
const Joi    = require('@hapi/joi');
const ServiceError = require('../utils/ServiceError');
const AuthHelper = require('../utils/AuthHelper');

/**
 * Validation 
 */
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const sampleAccounts = [
    {username: 'Test1', password: 'test1@mytest.com'},
    {username: 'Test2', password: 'test2@mytest.com'},
]

const login = async function(req, res, next) {
    try {
        const validation = loginSchema.validate(req.body);

        if (validation.error) {
            throw new ServiceError(400, _.get(validation, 'error.details[0].message'));
        }

        // verify
        const loginData = validation.value;
        const valid = sampleAccounts.some((account) => {
            return account.username == loginData.username && account.password == loginData.password;
        });

        if (!valid) throw new ServiceError(400, "username and password combination is incorrect!");

        // generate token 
        const token = AuthHelper.generateToken({username: loginData.username});

        res.send({
            'message': 'OK',
            'token': token
        })
    } catch (e) {
        next(e);
    }
}


const logout = function() {
    try {
        res.send({
            'message': 'OK logout'
        })
    } catch (e) {
        next(e);
    }

}

module.exports = {login, logout}