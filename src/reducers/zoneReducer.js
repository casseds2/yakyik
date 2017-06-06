import { constants } from '.././constants'

var initialState = {
    selectedZone: 0,
    list : []
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)

    switch(action.type) {

        case constants.ZONES_RECEIVED:
            console.log('ZONES_RECEIVED: ' + JSON.stringify(action.zones))
            updated['list'] = action.zones
            return updated //this.setState()

        case constants.ZONE_CREATED:
            console.log('ZONE_CREATED: ' + JSON.stringify(action.zone))
            //Watch for this, not immediately recognisable
            let updatedList = Object.assign([], updated.list)
            updatedList.push(action.zone)
            updated['list'] = updatedList
            return updated

        case constants.SELECTED_ZONE:
            console.log('SELECT_ZONE: ' + JSON.stringify(action.selectedZone))
            updated['selectedZone'] = action.selectedZone
            return updated

        default:
            return state
    }

}