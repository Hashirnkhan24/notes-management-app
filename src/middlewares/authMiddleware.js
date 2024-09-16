import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.split(' ')[1];  

  try {
    const decoded = jwt.verify(token, secretKey);  
    req.user = decoded;  
    next();  
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
