import React, { Component } from 'react'
import Comment from './Comment'
import styles from './styles'

class Comments extends Component{

    constructor(){
        super()
        this.state = {
            list: [
                {body:'comment 1', username: 'stephen', timestamp:'10:30'},
                {body:'comment 2', username: 'patrick', timestamp:'10:35'},
                {body:'comment 3', username: 'joseph', timestamp:'10:40'},
                {body:'comment 4', username: 'cassedy', timestamp:'10:45'}
            ]
        }
    }

    render(){

        const commentsStyle = styles.comment

        const listItems = this.state.list.map((comment, i) => {
            return (
                <li><Comment currentComment={comment}/></li>
            )
        })

        return(
            <div>
                <h2>Zone 1 Comments</h2>
                <div style={commentsStyle.commentsBox}>
                    <ul style={commentsStyle.commentsList}>
                        {listItems}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Comments