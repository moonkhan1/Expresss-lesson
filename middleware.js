const jwt=require("jsonwebtoken");

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).send("author error");
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err,email) => {
        console.log(err);
        if (err) return res.status(403).send('token error on verification');
        req.userEmail = email;
        next();
      })
  }

  module.exports=authToken;