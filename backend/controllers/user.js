const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, name, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (targetUser) {
        res.status(400).send({ message: 'Username been taken' })
    } else {
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUND);
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = await db.User.create({
            username,
            name,
            password: hashPassword
        })

        res.status(201).send(newUser)
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetUser = await db.User.findOne({ where: { username } });

        if (targetUser) {
            const isCorrectPassword = bcrypt.compare(password, targetUser.password)
            if (isCorrectPassword) {
                const payload = { id: targetUser.id, name: targetUser.name };
                const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });

                res.status(200).send({ token })

            } else {
                res.status(400).send({ message: "Invalid password" })
            }
        } else {
            res.status(400).send({ message: "User not found" })
        }
    } catch (err) {
        console.log(err)
        res.send()
    }

};

module.exports = {
    register,
    login
};