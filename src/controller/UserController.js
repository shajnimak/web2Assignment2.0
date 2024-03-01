const User = require('../model/User');
const auth = require('../utils/Auth');

class UserController {
    async createUser(req, res) {
        try {
            const { username, password, isAdmin } = req.body;
            //
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            //
            const user = await User.create({ username, password, isAdmin });
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const { username, password, isAdmin } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { username, password, isAdmin },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(deletedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async loginUser(req, res) {
        try {
            const { username, password } = req.body;

            // Проверка пользователя в базе данных
            const user = await User.findOne({ username });

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Генерация JWT токена при успешной аутентификации
            const token = auth.generateToken(user);

            // Включение дополнительных данных в ответ
            const responseData = {
                token,
                userId: user._id,
                username: user.username
            };

            res.status(200).json(responseData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();
