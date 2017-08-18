import React, { Component } from 'react'
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'

class Comment extends Component{

    constructor(){
        super()
        this.state = {
            isEditing: false,
            updated: null
        }
    }

    render(){

        const currentComment = this.props.currentComment
        const author = currentComment.author
        const editable = (this.props.isEditable) ? this.props.isEditable : false

        let content = null
        if(this.state.isEditing == true){
            content = (
                <div>

                    <textarea onChange={this.updateBody.bind(this)} defaultValue={currentComment.body} style={{width:100+'%'}}></textarea>
                    <br />

                    <img style={{borderRadius:15, float:'left', marginRight:12}} src={ImageHelper.thumbnail(author.image, 30)} />
                    <span style={{fontWeight:200}}>
                        <Link to={'/profile/' + author.username}>{author.username}</Link>
                    </span>
                    <span style={{fontWeight:200, marginLeft:12, marginRight:12}}> | </span>
                    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
                    <button style={{marginLeft:12}} onClick={this.toggleEdit.bind(this)}>Done</button>
                    <hr/>
                </div>
            )
        }
        else{
            content = (
                <div style={{marginBottom:16}}>
                    <p style = {{fontSize:20,fontWeight:400}}>
                        {currentComment.body}
                    </p>
                    <br/>
                    <img style={{borderRadius:15, float:'left', marginRight:12}} src={ImageHelper.thumbnail(author.image, 30)} />
                    <span style={{fontWeight:200}}>
                        <Link to={'/profile/' + author.username}>{author.username}</Link>
                    </span>
                    <span style = {{marginLeft:12, marginRight:12}}> | </span>
                    <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
                    { (editable) ? <button style={{marginLeft:12}} onClick={this.toggleEdit.bind(this)}>Edit</button> : null }
                    <hr/>
                </div>
            )
        }

        return(
            <div>
                { content }
            </div>
        )
    }

    updateBody(event){
        console.log('updatedBody: ' + event.target.value)
        this.setState({
            updated: event.target.value
        })
    }

    toggleEdit(event){
        event.preventDefault()
        //console.log('Edit Button')
        if(this.state.isEditing) {
            if (this.state.updated != null) {
                this.props.onUpdate(this.props.currentComment, this.state.updated) //Pass Updated String Back
            }
        }
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    componentDidUpdate(){
        console.log('isEditing: ' + this.state.isEditing)
    }
}

export default Comment