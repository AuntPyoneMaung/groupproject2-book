const bcrypt = require("bcrypt");
const saltRounds = 10;

const Constants = require("../constants/index");
const { serviceErrorCatch } = require("../constants/error-catch");

const { ValidationError } = require("sequelize"); // Validation Error is a class item

const { Users } = require("../connect.js");

module.exports = {
    editProfile: async (userId, email, oldPassword, newPassword) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const user = await Users.findByPk(userId);
        const findEmail = await Users.findAll({ where: { email: email }});

        // error catching

        serviceErrorCatch(result, !user, Constants.USER_NOTFOUND, 404)
        serviceErrorCatch(result, findEmail, Constants.EMAIL_INUSE, 409)

        const passwordVerification = await bcrypt.compare(oldPassword, user.password);

        if (!passwordVerification) {
            result.message = Constants.PASSWORD_INVALID;
            result.status = 400;
            return result;
        }

        try {

            // If new email/password not specified, use old email/password
            let newEmail = !email ? user.email : email;
            let newPwd = !newPassword ? user.password : bcrypt.hashSync(newPassword, saltRounds);

            // Message depending on what was edited
            let newMsg = !newPassword ? "Profile Updated!" : "Password Updated! Logging you out..."

            user.email = newEmail;
            user.password = newPwd;
            await user.save();

            result.status = 200;
            result.data = JSON.stringify(user);
            result.message = newMsg;
            return result;

        } catch (error) {

            serviceErrorCatch(result, error instanceof ValidationError, error.errors[0].message, 400)
            
            result.message = error.errors[0].message;
            result.status = 400;
            return result;
        }
    }
}