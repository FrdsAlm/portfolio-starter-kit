const jwt = require('jsonwebtoken');
const secret = 'dev-secret-change-in-production';
const token = jwt.sign({ userId: 'admin', role: 'admin' }, secret, { expiresIn: '7d' });
console.log(token);
