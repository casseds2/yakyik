var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var serverapp = require('../public/build/es5/serverapp')
var Home = require('../public/build/es5/components/layout/Home')
var store = require('../public/build/es5/stores/store')

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
    var initialStore = store.configureStore(reducers)

    //Assess whether current user is logged in


    var routes = {
        path: '/',
        component: serverapp,
        initial: initialStore,
        indexRoute: {
            component: Home
        }
    }

    matchRoutes(req, routes)
        .then(function (renderProps) {
            var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
            res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) });
            //console.log('SUCCESS: ' + html)
        })
        .catch(function (err) {
            console.log('FAIL: ' + err)
        })

});

router.get('/createzone', function(req, res, next){
    res.render('createzone', null);
});

router.get('/createcomment', function(req, res, next){
    res.render('createcomment', null);
});

module.exports = router;
