import { constants } from '../constants'

var initialState = {
    map: {}
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state)
    var updatedMap = Object.assign({}, updated.map)
    //let updatedProfileMap = Object.assign({}, updated.profileMap)

    switch(action.type) {

        case constants.COMMENTS_RECEIVED:
            let keys = Object.keys(action.params)
            let key = keys[0] //Key is the zone
            let value = action.params[key] //This is the zone id number
            //console.log('KEY: ' + key)
            //console.log('VALUE: ' + value)
            let commentsArray = []
            action.comments.forEach((comment, i) => {
                commentsArray.push(comment)
            })
            if(commentsArray == [])
                updatedMap[value] = []
            else
                updatedMap[value] = commentsArray
            updated['map'] = updatedMap
            //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(updatedMap))
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