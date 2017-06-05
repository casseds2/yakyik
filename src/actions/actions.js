import constants from '../constants'

export default {

    zonesReceived: (zones) => {
        return{
            type: constants.ZONES_RECEIVED,
            zones: zones
        }
    }

}