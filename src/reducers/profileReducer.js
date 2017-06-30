import { constants } from '../constants'

var initialState = {
    map: {},
    appStatus: 'ready'
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)
    var updatedMap = Object.assign({}, updated.map)

    switch(action.type){

        case constants.PROFILE_RECEIVED:
            updatedMap[action.profile.username] = action.profile
            updated['map'] = updatedMap
            updated['appStatus'] = 'ready'
            return updated

        case constants.APPLICATION_STATE:
            console.log('APPLICATION_STATE: ' + action.status)
            updated['appStatus'] = action.status
            return updated

        default:
            return state
    }

}