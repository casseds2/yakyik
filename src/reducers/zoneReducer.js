import constants from '../constants'

var initialState = {

    list : []

}

export default (state = initialState, action) => {

    switch(action.type) {

        case constants.ZONES_RECEIVED:
            

        default: return state
    }

}