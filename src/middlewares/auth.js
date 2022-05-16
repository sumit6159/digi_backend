const User =  require('../models/user.model')


const authorise =  (permittedRoles)=> {
    return async(req, res, next) =>{

        const userAllowed = await User.findOne({email: req.body.email}).lean().exec();
        console.log(userAllowed);
        let isPermitted = 0;
        if(userAllowed){
            if(userAllowed.type === 'admin'){
                isPermitted = 1;
            }  else if(userAllowed.type === 'user'){
                isPermitted = 2;
            }
        }
        if(isPermitted === 0){
            req.auth = 'Permission denied';
        } else if(isPermitted === 1){
            req.auth = 'Permission granted for all';
        } else if(isPermitted === 2){
            req.auth = 'Permission granted to buy';
        } 

        return next();
    }
}

module.exports = authorise;

