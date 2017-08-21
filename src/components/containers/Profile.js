import React, { Component } from 'react'
import { actions } from '../../actions'
import { connect } from 'react-redux'

class Profile extends Component{

    constructor(){
        super()
        this.state = {
        }
    }

    componentDidMount(){
        const profile = this.props.profiles[this.props.username] //Taken From The Map
        if(profile != null){ //rendered server side
            console.log('Profile Already Existed: ' + JSON.stringify(profile))
            this.props.fetchComments({'author.id': profile._id})
            return
        }
        console.log('Fetching the user profile...')
        this.props.fetchProfile({username: this.props.username})
    }

    render(){

        let profile = this.props.profiles[this.props.username]
        let header = null
        if(profile != null){

            const comments = (this.props.comments[profile._id]) ? this.props.comments[profile._id] : []
            const list = comments.map((comment, i) => {
                return(<li key={i}>{comment.body}</li>)
            })

            header = (
                <div>
                    <h3>{profile.username}</h3>
                    <p>
                        gender: {profile.gender} <br />
                        city: {profile.city} <br />
                    </p>
                    <h2>Comments</h2>
                    <ol>
                        { list }
                    </ol>
                </div>
            )
        }
        //const content = ( this.props.appStatus == 'loading' ) ? 'Loading...' : header
        const content = ( this.props.profiles[this.props.username] == null ) ? 'Loading...' : header
        return (
            <div>
                { content }
            </div>
        )
    }
}

/*State Variables To Properties*/
const stateToProps = (state) => { //state may also be known as store...convention to call state
    return{
        comments: state.comment.profileMap, //State Map of comments
        profiles: state.profile.map, //State Map of profiles
        appStatus: state.profile.appStatus
    }
}

/*Store Variables To Properties*/
const dispatchToProps = (dispatch) => {
    return{
        fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
        profileReceived: (profile) => dispatch(actions.profileReceived(profile)),
        fetchComments: (params) => dispatch(actions.fetchComments(params))
    }
}


export default connect(stateToProps, dispatchToProps) (Profile)