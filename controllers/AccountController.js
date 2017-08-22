var ProfileController = require('./ProfileController')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

module.exports = {

    login: function(req){
        return new Promise(function(resolve, reject){
            var params = {username: req.body.username}
            ProfileController.find(params, function(err, results) {
                if (err) {
                    reject({message: 'User Failed To Login'})
                    return
                }

                if (results.length == 0) {
                    reject({message: 'User Does Not Exist'})
                    return
                }
                var profile = results[0]
                var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
                if (isPasswordCorrect == false) {
                    reject({message: 'Wrong Password Entered'})
                    return
                }

                req.session.user = profile._id

                resolve(profile)
            })
        })
    },

    currentUser: function(req){
        return new Promise(function(resolve, reject){
            if(req.session == null){
                resolve(null)
                return
            }

            if(req.session.user == null){
                resolve(null)
                return
            }
            ProfileController.findById(req.session.user, function(err, result){
                if(err){
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    }

}