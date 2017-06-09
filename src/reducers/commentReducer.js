import { constants } from '../constants'

var initialState = {
    map: {}
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)
    var updatedMap = Object.assign([], updated.map)

    switch(action.type) {

        case constants.COMMENTS_RECEIVED:
            let zoneComments = updatedMap[action.zone._id]
            if(zoneComments == null){
                zoneComments = []
            }
            else {
                zoneComments = Object.assign([], zoneComments)
            }
            action.comments.forEach((comment, i) => {
                zoneComments.push(comment)
            })
            updatedMap[action.zone._id] = zoneComments
            updated['map'] = updatedMap
            //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(updated))
            return updated

        case constants.COMMENT_CREATED:
            //console.log('COMMENT_CREATED: ' + JSON.stringify(action.comment))
            let commentList = updatedMap[action.comment.zone]
            if(commentList == null){
                commentList = []
            }
            else{
                commentList = Object.assign([], commentList)
            }
            commentList.push(action.comment)
            updatedMap[action.comment.zone] = commentList
            updated['map'] = updatedMap
            return updated

        case constants.SELECTED_ZONE:
            return updated

        default:
            return state

    }
}