"use strict";

var constants = require("../constants").constants;
var APIManager = require("../utils").APIManager;
module.exports = {

    zonesReceived: function (zones) {
        return {
            type: constants.ZONES_RECEIVED,
            zones: zones
        };
    },

    fetchComments: function (params) {
        return function (dispatch) {
            APIManager.get("/api/comment", params, function (err, response) {
                if (err) {
                    alert(err);
                    return;
                }
                //console.log('fetchComments: ' + JSON.stringify(response))
                var comments = response.results;
                dispatch({
                    type: constants.COMMENTS_RECEIVED,
                    comments: comments,
                    params: params
                });
            });
        };
    },

    fetchZones: function (params) {
        return function (dispatch) {
            dispatch({
                type: constants.APPLICATION_STATE,
                status: "loading",
                reducer: "zoneReducer"
            });

            APIManager.get("/api/zone", params, function (err, response) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log("Action (fetchZones):" + JSON.stringify(response));
                var zones = response.results;
                dispatch({
                    type: constants.ZONES_RECEIVED,
                    zones: zones
                });
            });
        };
    },

    zoneCreated: function (zone) {
        return {
            type: constants.ZONE_CREATED,
            zone: zone
        };
    },

    selectedZone: function (index) {
        return {
            type: constants.SELECTED_ZONE,
            selectedZone: index
        };
    },

    commentCreated: function (comment) {
        return {
            type: constants.COMMENT_CREATED,
            comment: comment
        };
    },

    updateComment: function (comment, params) {
        return function (dispatch) {
            var endpoint = "/api/comment/" + comment._id;
            APIManager.put(endpoint, params, function (err, response) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log(JSON.stringify(response));
                var updatedComment = response.results;
                dispatch({
                    type: constants.COMMENT_UPDATED,
                    comment: updatedComment
                });
            });
        };
    },

    commentsReceived: function (comments, zone) {
        return {
            type: constants.COMMENTS_RECEIVED,
            comments: comments,
            zone: zone
        };
    },

    currentUserReceived: function (user) {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            user: user
        };
    },

    // profileReceived: (profile) => {
    //     return{
    //         type: constants.PROFILE_RECEIVED,
    //         profile: profile
    //     }
    // },

    fetchProfile: function (params) {
        return function (dispatch) {
            dispatch({
                type: constants.APPLICATION_STATE,
                status: "loading",
                reducer: "profileReducer"
            });
            APIManager.get("/api/profile", params, function (err, response) {
                if (err) {
                    console.log("ERROR: " + err);
                    return;
                }
                console.log("Action (fetchProfile): " + JSON.stringify(response));
                if (response.results.length == 0) {
                    alert("Profile Not Found.");
                    return;
                }
                var profile = response.results[0];
                //Timeout Simulates Weak Internet Connection
                // setTimeout(() => {
                dispatch({
                    type: constants.PROFILE_RECEIVED,
                    profile: profile
                });
            });
        };
    },

    updateProfile: function (profile, updated) {
        return function (dispatch) {
            var endpoint = "/api/profile/" + profile._id;
            APIManager.put(endpoint, updated, function (err, response) {
                if (err) {
                    alert("ERROR: " + JSON.stringify(err));
                    return;
                }
                var updatedProfile = response.results;
                dispatch({
                    type: constants.PROFILE_UPDATED,
                    profile: updatedProfile
                });
                console.log("Profile Updated: " + JSON.stringify(response));
            });
        };
    }
};
//Simulate Bad Internet Connection
// setTimeout(() => {
//     dispatch({
//         type: constants.ZONES_RECEIVED,
//         zones: zones
//     })
// }, 3000)
// }, 3000)