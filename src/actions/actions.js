import { constants } from '../constants'
import { APIManager } from '../utils'

export default {

    zonesReceived: (zones) => {
        return{
            type: constants.ZONES_RECEIVED,
            zones: zones
        }
    },

    fetchZones: (params) => {
        return(dispatch) => {

            dispatch({
                type: constants.APPLICATION_STATE,
                status: 'loading'
            })

            APIManager.get('/api/zone', params, (err, response) => {
                if(err){
                    alert(err)
                    return
                }
                console.log('Action (fetchZones):' + JSON.stringify(response))
                const zones = response.results
                dispatch({
                    type: constants.ZONES_RECEIVED,
                    zones: zones
                })
                //Simulate Bad Internet Connection
                // setTimeout(() => {
                //     dispatch({
                //         type: constants.ZONES_RECEIVED,
                //         zones: zones
                //     })
                // }, 3000)
            })
        }
    },

    zoneCreated: (zone) => {
        return{
            type: constants.ZONE_CREATED,
            zone: zone
        }
    },

    selectedZone: (index) => {
        return{
            type: constants.SELECTED_ZONE,
            selectedZone: index
        }
    },

    commentCreated: (comment) => {
        return{
            type:constants.COMMENT_CREATED,
            comment: comment
        }
    },

    commentsReceived: (comments, zone) => {
        return{
            type: constants.COMMENTS_RECEIVED,
            comments: comments,
            zone: zone
        }
    },

    currentUserReceived: (user) => {
        return{
            type: constants.CURRENT_USER_RECEIVED,
            user: user
        }
    },

    // profileReceived: (profile) => {
    //     return{
    //         type: constants.PROFILE_RECEIVED,
    //         profile: profile
    //     }
    // },

    fetchProfile: (params) => {
        return (dispatch) => {
            dispatch({
                type: constants.APPLICATION_STATE,
                status: 'loading'
            })
            APIManager.get('/api/profile', params, (err, response) => {
                if(err){
                    console.log('ERROR: ' + err)
                    return
                }
                console.log('Action (fetchProfile): ' + JSON.stringify(response))
                if (response.results.length == 0) {
                    alert('Profile Not Found.')
                    return
                }
                const profile = response.results[0]
                //Timeout Simulates Weak Internet Connection
                // setTimeout(() => {
                //     dispatch({
                //         type: constants.PROFILE_RECEIVED,
                //         profile: profile
                //     })
                // }, 3000)
            })
        }
    },

    updateProfile: (profile, updated) => {
        return(dispatch) => {
            const endpoint = '/api/profile/' + profile._id
            APIManager.put(endpoint, updated, (err, response) => {
                if(err){
                    alert('ERROR: ' + JSON.stringify(err))
                    return
                }
                const updatedProfile = response.results
                dispatch({
                    type: constants.PROFILE_UPDATED,
                    profile: updatedProfile
                })
                console.log('Profile Updated: ' + JSON.stringify(response))
            })
        }
    }
}