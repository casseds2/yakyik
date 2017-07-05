import { constants } from '../constants'

var initialState = {
    user: null
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch(action.type){

        case constants.CURRENT_USER_RECEIVED:
            //console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.user))
            updated['user'] = action.user
            return updated

        case constants.PROFILE_UPDATED:
            console.log('profileReducer (PROFILE_UPDATED): ' + JSON.stringify(action.profile))
            //updatedMap[action]
            if(action.profile._id != updated.user._id)
                return updated
            updated['user'] = action.profile
            return updated

        default:
            return state
    }

}