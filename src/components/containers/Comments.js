import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'

class Comments extends Component{

    constructor(){
        super()
        this.state = {
            comment: {
                username: '',
                body: '',
                timestamp: ''
            },
            list: [
                //{body:'comment 1', username: 'stephen', timestamp:'10:30'},
                //{body:'comment 2', username: 'patrick', timestamp:'10:35'},
                //{body:'comment 3', username: 'joseph', timestamp:'10:40'},
                //{body:'comment 4', username: 'cassedy', timestamp:'10:45'}
            ]
        }
    }

    submitComment(){
        console.log('submitComment: ' + JSON.stringify(this.state.comment))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.comment)
        this.setState({
            list: updatedList
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

    updateBody(event){
        //console.log('updateComment: ' + event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['body'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateTimeStamp(event){
        //console.log('updateTime: ' + event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['timestamp'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    render(){

        const commentsStyle = styles.comment

        const listItems = this.state.list.map((comment, i) => {
            return (
                <li key={i}><Comment currentComment={comment}/></li>
            )
        })

        return(
            <div>
                <h2>Zone 1 Comments</h2>
                <div style={commentsStyle.commentsBox}>
                    <ul style={commentsStyle.commentsList}>
                        {listItems}
                    </ul>

                    <input onChange={this.updateUserName.bind(this)} className="form-control" type="text" placeholder="Username"/>
                    <br/>
                    <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment"/>
                    <br/>
                    <input onChange={this.updateTimeStamp.bind(this)} className="form-control" type="text" placeholder="Time"/>
                    <br/>
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
            </div>
        )
    }
}

export default Comments