const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
   const token = req.header('Authorization').replace('Bearer ', '');
   if (!token) return res.status(401).send('Access Denied');

   try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.company = verified;
      next();
   } catch (err) {
      res.status(400).send('Invalid Token');
   }
};

module.exports = authenticate;
