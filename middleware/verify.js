const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verify_role(){
    return function(req, rest, next){
        var role = req.body.role;
        //authorization header
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            //verify
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'Token not registered!'});
                }
                else{
                    if(role == 2){
                        req.auth = decoded;
                        next()
                    }
                    else{
                        return rest.status(401).send({auth:false, message:'Failed authorize your user role!'});
                    }
                }
            });
        }
        else{
            return rest.status(401).send({auth:false, message:'Token not found!'});
        }
    }
}

module.exports = verify_role;