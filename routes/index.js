var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var __BUILD_DIR__ = '../public/build'
var serverapp = require(__BUILD_DIR__ + '/es5/serverapp')
var Home = require(__BUILD_DIR__ + '/es5/components/layout/Home')
var ProfileInfo = require(__BUILD_DIR__ + '/es5/components/layout/ProfileInfo')
var store = require(__BUILD_DIR__ + '/es5/stores/store')

var controllers = require('../controllers')
var AccountController = require('../controllers/AccountController')

var matchRoutes = function(req, routes){
    return new Promise(function (resolve, reject) {
        ReactRouter.match({ routes, location: req.url }, function (error, redirectLocation, renderProps) {
            if(error){
                reject(error)
                return
            }
            resolve(renderProps)
        })
    })
}

/* GET home page. */
router.get('/', function(req, res, next) {

    var reducers = {}
    var initialStore = null

    AccountController.currentUser(req)
        .then(function(result){
            console.log('CURRENT USER: ' + JSON.stringify(result))
            reducers['account'] = { //account relates to the account fom the store
                user: result //user relates to the user in the account reducer
            }
            return controllers.zone.get(null) //Promise returns in next block
        })
        .then(function (zones) {
            //console.log('Zones Promise: ' + JSON.stringify(zones))
            reducers['zone'] = {
                selectedZone: 0,
                list : zones,
                appStatus: 'ready'
            }
            console.log('Reducer After Zone: ' + JSON.stringify(reducers))
        })
        .then(function(){
            initialStore = store.configureStore(reducers)
            var routes = {
                path: '/',
                component: serverapp,
                initial: initialStore,
                indexRoute: {
                    component: Home
                }
            }
            return matchRoutes(req, routes) //Have to return a promise to get to the next one
        })
        .then(function (renderProps) {
            var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
            res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) });
            //console.log('SUCCESS: ' + html)
        })
        .catch(function(err){
            console.log('NOT LOGGED IN: ' + JSON.stringify(err))
        })
});

router.get('/:page/:slug', function (req, res, next) {
    var page = req.params.page
    var slug = req.params.slug

    var reducers = {}
    var initialStore = null

    if(page == 'api' || page == 'account'){ //Will cause hanging if not put in
        next()
        return
    }
    controllers.profile.get({username: slug})
        .then(function(profiles){
            var profile = profiles[0]
            var profileMap = {}
            profileMap[slug] = profile //slug is username
            reducers['profile'] = {
                list: [profile],
                map: profileMap,
                appStatus: 'ready'
            }
            initialStore = store.configureStore(reducers)
            var routes = {
                path: '/profile/:username',
                component: serverapp,
                initial: initialStore,
                indexRoute: {
                    component: ProfileInfo
                }
            }
            return matchRoutes(req, routes)
        })
        .then(function (renderProps) {
            var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
            res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) });
            //console.log('SUCCESS: ' + html)
        })
        .catch(function(err){
            console.log('ERROR LOADING PROFILE INFO: ' + JSON.stringify(err))
        })
})

router.get('/createzone', function(req, res, next){
    res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next){
    res.render('createcomment', null);
});

module.exports = router;
