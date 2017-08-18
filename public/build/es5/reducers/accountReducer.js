"use strict";

var constants = require("../constants").constants;


var initialState = {
    user: null
};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];


    var updated = Object.assign({}, state);

    switch (action.type) {

        case constants.CURRENT_USER_RECEIVED:
            //console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.user))
            updated.user = action.user;
            return updated;

        case constants.PROFILE_UPDATED:
            console.log("profileReducer (PROFILE_UPDATED): " + JSON.stringify(action.profile));
            //updatedMap[action]
            if (action.profile._id != updated.user._id) return updated;
            updated.user = action.profile;
            return updated;

        default:
            return state;
    }
};