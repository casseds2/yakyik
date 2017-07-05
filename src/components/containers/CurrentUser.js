import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../actions'

class CurrentUser extends Component{

    constructor(){
        super()
        this.state = {
            updatedProfile: {

            }
        }
    }

    componentDidMount(){
        console.log('CurrentUser (componentDidMount): ' + JSON.stringify(this.props.user))
    }

    updateCurrentUser(event){
        event.preventDefault()
        console.log('updateCurrentUser: ' + event.target.id + "==" + event.target.value)

        let updated = Object.assign({}, this.state.updatedProfile)
        updated[event.target.id] = event.target.value
        this.setState({
            updatedProfile: updated
        })
    }

    updateProfile(event){
        event.preventDefault()
        console.log('UpdatedProfile: ' + JSON.stringify(this.state.updatedProfile))
        if(Object.keys(this.state.updatedProfile).length == 0){
            alert('No Changes Made')
            return
        }
        this.props.updateProfile(this.props.user, this.state.updatedProfile)
    }

    render(){
        const currentUser = this.props.user
        return(
            <div>
                <h2> Welcome { currentUser.username } </h2>
                <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username"/><br/>
                <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender"/><br/>
                <input type="text" id="city" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} placeholder="City"/><br/>
                <button onClick={this.updateProfile.bind(this)}>Update Profile</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.account.user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))
    }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser)