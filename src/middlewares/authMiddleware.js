const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação ausente' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userPermissao = decoded.permissao;
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
};

module.exports = authMiddleware;