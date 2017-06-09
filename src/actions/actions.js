import { constants } from '../constants'

export default {

    zonesReceived: (zones) => {
        return{
            type: constants.ZONES_RECEIVED,
            zones: zones
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
    }
}