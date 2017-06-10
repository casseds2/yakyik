import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { actions } from '../../actions'
import { connect } from 'react-redux'

class Profile extends Component{

    constructor(){
        super()
        this.state = {
        }
    }

    componentDidMount(){
        APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
            if(err){
                alert(err.message)
                return
            }
            //console.log('componentDidMount: ' + JSON.stringify(response))
            if(response.results.length == 0){
                alert('Profile Not Found.')
                return
            }
            const profile = response.results[0]
            //console.log('received Profile: ' + JSON.stringify(profile))
            this.props.profileReceived(profile)
        })
    }

    render(){
        let profile = null
        for(var i = 0; i < this.props.profiles.length; i++){
            if(this.props.profiles[i].username == this.props.username){
                profile = this.props.profiles[i]
                break
            }
        }

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
        return header
    }
}

/*State Variables To Properties*/
const stateToProps = (state) => { //state may also be known as store...convention to call state
    return{
        profiles: state.profile.list
    }
}

/*Store Variables To Properties*/
const dispatchToProps = (dispatch) => {
    return{
        profileReceived: (profile) => dispatch(actions.profileReceived(profile))
    }
}


export default connect(stateToProps, dispatchToProps) (Profile)