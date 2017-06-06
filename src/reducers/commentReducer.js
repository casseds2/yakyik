import { constants } from '../constants'

var initialState = {
    list : []
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state)

    switch(action.type) {

        case constants.COMMENTS_RECEIVED:
            updated['list'] = action.comments
            console.log('COMMENTS_RECEIVED')
            return updated

        default:
            return state

    }
}