var ProfileController = require('./ProfileController')
var Promise = require('bluebird')

module.exports = {

    currentUser: function(req){

        return new Promise(function(resolve, reject){
            if(req.session == null){
                //User Never Signed In Before(They've no session)
                // res.json({
                //     confirmation: 'fail',
                //     message: 'User Not Logged In'
                // })
                reject({message: 'User Not Logged In'}, null)
                return
            }

            if(req.session.user == null){
                // res.json({
                //     confirmation: 'fail',
                //     message: 'User Not Logged In'
                // })
                reject({message: 'User Not Logged In'}, null)
                return
            }
            ProfileController.findById(req.session.user, function(err, result){
                if(err){
                    // res.json({
                    //     confirmation: 'fail',
                    //     message: err.message
                    // })
                    reject(err)
                    return
                }
                // res.json({
                //     confirmation: 'success',
                //     user: result
                // })
                resolve(result)
            })
        })
    }

}