const jwt = require('jwt-simple');
const moment = require('moment');
const secretPass = 'bertin_osborne_maricon';

exports.createToken = (user) =>{
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        iat: moment().unix(),
        exp:  moment().add(30, 'days').unix
    };

    return jwt.encode(payload,secretPass)

}