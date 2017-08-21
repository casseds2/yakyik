import { constants } from '../constants'

var initialState = {
    map: {},
    profileMap: {}
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

            let profileComments = updated[action.zone.author._id]

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

        case constants.COMMENT_UPDATED:
            console.log('COMMENT_UPDATED: ' + JSON.stringify(action.comment))
            let list = updatedMap[action.comment.zone]
            let newList = []
            list.forEach((comment, i) => {
                if(comment._id == action.comment._id)
                    newList.push(action.comment)
                else
                    newList.push(comment)
            })

            updatedMap[action.comment.zone]= newList
            updated['map'] = updatedMap
            return updated

        case constants.SELECTED_ZONE:
            return updated

        default:
            return state

    }
}