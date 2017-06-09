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
    }

    /*Override Function -- Triggered By Change In the Store(Redux Changes State Form Store)*/
    componentDidUpdate(){
        //console.log('Comments Container: componentDidUpdate')
        let zone = this.props.zones[this.props.index]
        if(zone == null){
            console.log('NO SELECTED ZONE')
            return
        }
        //Stop Duplicate Downloads of Comments from API
        //If the Key List At the Current Key is Not Null, it Has Already Been Downloaded
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

    render(){
        const selectedZone = this.props.zones[this.props.index]
        let zoneName = null
        let commentList = null
        if(selectedZone != null) {
            zoneName = selectedZone.name
            let zoneComments = this.props.commentsMap[selectedZone._id]
            if (zoneComments != null) {
                commentList = zoneComments.map((comment, i) => {
                    return (
                        <li key={i}><Comment currentComment={comment}/></li>
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
        commentCreated: (comment) => dispatch(actions.commentCreated(comment))
    }
}

export default connect(stateToProps, dispatchToProps) (Comments)