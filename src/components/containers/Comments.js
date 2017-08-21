import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import {APIManager} from '../../utils'
import { actions } from '../../actions'
import { connect } from 'react-redux'

class Comments extends Component{

    constructor(){
        super()
        this.state = {
        }
        this.checkForComments.bind(this)
    }

    checkForComments(){
        let zone = this.props.zones[this.props.index]
        if(zone == null){
            console.log('NO SELECTED ZONE')
            return
        }
        let commentsArray = this.props.commentsMap[zone._id]
        if(commentsArray != null){
            return
        }
        APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            let comments = response.results
            this.props.commentsReceived(comments, zone)
        })
    }

    componentDidMount(){
        this.checkForComments()
    }

    componentDidUpdate(){
        this.checkForComments()
    }

    submitComment(comment){
        if(this.props.user == null){
            alert('Please Sign Up or Log In To Comment')
            return
        }
        let updatedComment = Object.assign({}, comment)
        //Assign Zone Property of Currently Selected Zone
        let zone = this.props.zones[this.props.index]
        updatedComment['zone'] = zone._id
        updatedComment['username'] = this.props.user.username
        console.log('submitComment: ' + JSON.stringify(updatedComment))
        updatedComment['author'] = {
            id: this.props.user._id,
            username: this.props.user.username,
            image:this.props.user.image
        }
        APIManager.post('/api/comment', updatedComment, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            let updatedComment = response.results
            this.props.commentCreated(updatedComment)
            //Could also use this approach, re-uses code and is elegant
            //this.props.commentsReceived([updatedComment], zone)
        })
    }

    updateUserName(event){
        //console.log('updateUserName: ' + event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['username'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateComment(comment, updatedBody){
        console.log('updateComment: ' + comment._id + ', ' + updatedBody)
        //Want to Update the Comment in Database Here
        this.props.updateComment(comment, {body: updatedBody})
    }

    render(){
        const selectedZone = this.props.zones[this.props.index]
        const currentUser = this.props.user //null if not logged in
        let zoneName = null
        let commentList = null


        if(selectedZone != null) {
            zoneName = selectedZone.name
            let zoneComments = this.props.commentsMap[selectedZone._id]
            if (zoneComments != null) {
                commentList = zoneComments.map((comment, i) => {
                    let editable = false
                    if(currentUser != null){
                        if(currentUser._id == comment.author.id)
                            editable = true
                    }
                    return (
                        <li key={i}><Comment onUpdate={this.updateComment.bind(this)} isEditable={editable} currentComment={comment}/></li>
                    )
                })
            }
        }

        const commentsStyle = styles.comment
        return(
            <div>
                <h2> {zoneName} </h2>
                <div style={commentsStyle.commentsBox}>
                    <ul style={commentsStyle.commentsList}>
                        {commentList}
                    </ul>
                    <CreateComment onCreate={this.submitComment.bind(this)}/>
                </div>
            </div>
        )
    }
}

/*State Variables To Properties*/
const stateToProps = (state) => { //state may also be known as store...convention to call state
    return{
        commentsMap: state.comment.map,
        commentsLoaded: state.comment.commentsLoaded,
        index: state.zone.selectedZone,
        zones: state.zone.list,
        user: state.account.user
    }
}

/*Store Variables To Properties*/
const dispatchToProps = (dispatch) => {
    return{
        commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
        commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
        updateComment: (comment, params) => dispatch(actions.updateComment(comment, params))

    }
}

export default connect(stateToProps, dispatchToProps) (Comments)