const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { users } = require('../models');

class UserController{
    static register(req, res){
        const { name, username, email, password, role, address, phoneNumber } = req.body;
        users.create({
            name, username, email, password, role, address, phoneNumber
            })
            .then(result => {
                let response = {
                    message: "Success creating new user",
                    id: result.id,
                    name: result.name,
                    username: result.username,
                    email: result.email,
                    role: result.role,
                    phoneNumber: result.phoneNumber,
                    address: result.address
                }
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
    static login(req, res){
        const { email, password } = req.body;
        users.findOne({
            where: {
                email
            }
            })
            .then(user => {
                if (!user){
                    throw{
                        name: "User Login Error",
                        devMessage: `User with email "${email}" not found`
                    }
                }
                const isCorrect = comparePassword(password, user.password)
                if (!isCorrect){
                    throw{
                        name: "Unauthorized",
                        devMessage: `Invalid username/password`
                    }
                }
                let payload = {
                    id: user.id,
                    email: user.email
                }
                
                const token = generateToken(payload);

                let response = {
                    accessToken: token,
                    name: user.name,
                    role: user.role,
                    id: user.id
                }

                return res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

}

module.exports = UserController