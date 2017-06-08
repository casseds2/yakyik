var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next){

    var action = req.params.action

    if(action == 'logout'){
        req.session.reset()
        res.json({
            confirmation: 'success',
            message: 'User Logged Out'
        })
    }

    if(action == 'currentuser'){
        if(req.session == null){
            //User Never Signed In Before(They've no session)
            res.json({
                confirmation: 'fail',
                message: 'User Not Logged In'
            })
            return
        }

        if(req.session.user == null){
            res.json({
                confirmation: 'fail',
                message: 'User Not Logged In'
            })
            return
        }

        ProfileController.findById(req.session.user, function(err, result){
            if(err){
                res.json({
                    confirmation: 'fail',
                    message: err.message
                })
                return
            }
            res.json({
                confirmation: 'success',
                user: result
            })
        })
    }
})

router.post('/:action', function(req, res, next){

    var action = req.params.action

    if(action == 'register'){
        ProfileController.create(req.body, function(err, result){
            if(err){
                res.json({
                    confirmation: 'fail',
                    message: err.message
                })
                return
            }
            req.session.user = result._id
                res.json({
                    confirmation: 'success',
                    user:result
                })
        })
    }

    if(action == 'login'){
        var params = {username: req.body.username} //Params must be passed in as JSON object
        ProfileController.find(params, function(err, results){
            if(err){
                res.json({
                    confirmation: 'fail',
                    message: err.message
                });
                return
            }

            if(results.length == 0){
                res.json({
                    confirmation:'fail',
                    message: 'Username Does Not Exist. Check Your Spelling.'
                })
                return
            }


            var profile = results[0]
            var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
            if(isPasswordCorrect == false){
                res.json({
                    confirmation: 'fail',
                    message: 'Wrong Password'
                })
                return
            }

            req.session.user = profile._id

            res.json({
                confirmation: 'success',
                profile: profile
            })
        })
    }
})

module.exports = router