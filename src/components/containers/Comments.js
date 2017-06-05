import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import {APIManager} from '../../utils'

class Comments extends Component{

    constructor(){
        super()
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        console.log('Comments componentDidMount: ')
        APIManager.get('/api/comment', null, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            //console.log('RESULTS: ' + JSON.stringify(response.results))
            this.setState({
                list: response.results
            })
        })
    }

    submitComment(comment){
        console.log('submitComment: ' + JSON.stringify(comment))
        //let updatedComment = Object.assign({}, comment)
        APIManager.post('/api/comment', comment, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.results)
            this.setState({
                list: updatedList
            })
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
                    <CreateComment onCreate={this.submitComment.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Comments