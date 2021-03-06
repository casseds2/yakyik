"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

module.exports = {

    get: function (url, params, callback) {
        superagent.get(url).query(params).set("Accept", "application/json").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }
            callback(null, response.body);
        });
    },

    post: function (url, body, callback) {
        superagent.post(url).send(body).set("Accept", "application/JSON").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }
            callback(null, response.body);
        });
    },

    put: function (url, body, callback) {
        superagent.put(url).send(body).set("Accept", "application/JSON").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }
            callback(null, response.body);
        });
    },

    "delete": function () {},

    upload: function (endpoint, file, params, callback) {
        //Where we want it to go, the file, accompanied params
        console.log("APIManager - upload: ");
        var uploadRequest = superagent.post(endpoint);
        uploadRequest.attach("file", file);
        Object.keys(params).forEach(function (key) {
            uploadRequest.field(key, params[key]);
        });
        uploadRequest.end(function (err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, res);
        });
    }
};