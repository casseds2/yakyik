"use strict";

var constants = require("../constants").constants;


var initialState = {
    map: {},
    appStatus: "ready"
};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];


    var updated = Object.assign({}, state);
    var updatedMap = Object.assign({}, updated.map);

    switch (action.type) {

        case constants.PROFILE_RECEIVED:
            updatedMap[action.profile.username] = action.profile;
            updated.map = updatedMap;
            updated.appStatus = "ready";
            return updated;

        case constants.APPLICATION_STATE:
            console.log("APPLICATION_STATE: " + action.status);
            updated.appStatus = action.status;
            return updated;

        default:
            return state;
    }
};