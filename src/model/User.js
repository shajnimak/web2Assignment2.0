const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    likedMusic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    isAdmin: Boolean,
});

// Метод для хеширования пароля перед сохранением пользователя
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Метод для сравнения пароля
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
