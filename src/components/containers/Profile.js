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
            return
        }
        console.log('Fetching the user profile...')
        this.props.fetchProfile({username: this.props.username})
    }

    render(){

        let profile = this.props.profiles[this.props.username]
        let header = null
        if(profile != null){
            header = (
                <div>
                    <h3>{profile.username}</h3>
                    <p>
                        gender: {profile.gender} <br />
                        city: {profile.city} <br />
                    </p>
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
        comments: state.comment.map, //State Map of comments
        profiles: state.profile.map, //State Map of profiles
        appStatus: state.profile.appStatus
    }
}

/*Store Variables To Properties*/
const dispatchToProps = (dispatch) => {
    return{
        fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
        profileReceived: (profile) => dispatch(actions.profileReceived(profile))
    }
}


export default connect(stateToProps, dispatchToProps) (Profile)