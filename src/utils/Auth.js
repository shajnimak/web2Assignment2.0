const jwt = require('jsonwebtoken');
const User = require('../model/User');

const generateToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin || false,
    };

    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }

    try {
        const decodedToken = await verifyToken(token);
        req.userId = decodedToken.userId;
        req.isAdmin = decodedToken.isAdmin;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

const checkAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }
    next();
};

module.exports = {
    generateToken,
    verifyToken,
    authenticateUser,
    checkAdmin,
};
