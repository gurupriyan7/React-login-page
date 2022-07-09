const jwt = require('jsonwebtoken')


const generateToken=(id)=>{
          return jwt.sign({id},process.env.TOKEN_SCRECET,{
                    expiresIn:"30d"
          })
}

module.exports = generateToken;