"use strict";

var constants = require(".././constants").constants;


var initialState = {
    selectedZone: 0,
    list: [],
    appStatus: "ready"
};

module.exports = function (_x, action) {
    var state = arguments[0] === undefined ? initialState : arguments[0];


    var updated = Object.assign({}, state);

    switch (action.type) {

        case constants.ZONES_RECEIVED:
            console.log("ZONES_RECEIVED: " + JSON.stringify(action.zones));
            updated.list = action.zones;
            updated.appStatus = "ready";
            console.log("APPLICATION_STATE (zoneReducer): ready");
            return updated; //this.setState()

        case constants.ZONE_CREATED:
            console.log("ZONE_CREATED: " + JSON.stringify(action.zone));
            //Watch for this, not immediately recognisable
            var updatedList = Object.assign([], updated.list);
            updatedList.push(action.zone);
            updated.list = updatedList;
            return updated;

        case constants.SELECTED_ZONE:
            console.log("SELECT_ZONE: " + JSON.stringify(action.selectedZone));
            updated.selectedZone = action.selectedZone;
            return updated;

        case constants.APPLICATION_STATE:
            console.log("APPLICATION_STATE (zoneReducer): " + action.status);
            updated.appStatus = action.status;
            return updated;

        default:
            return state;
    }
};