import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Comment extends Component{
    render(){

        const currentComment = this.props.currentComment

        return(
            <div style={{marginBottom:16}}>
                <p style = {{fontSize:20,fontWeight:400}}>
                    {currentComment.body}
                </p>
                <br/>
                <span style={{fontWeight:200}}>
                    <Link to={'/profile/' + currentComment.username}>{currentComment.username}</Link>
                </span>
                <span style = {{marginLeft:12, marginRight:12}}> | </span>
                <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
                <hr/>
            </div>
        )
    }
}

export default Comment