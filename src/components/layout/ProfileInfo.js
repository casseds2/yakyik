import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileInfo extends Component{

    componentDidMount(){
        console.log('componentDidMount: ' + JSON.stringify(this.props.match.params))
    }

    render(){

        return(
            <div>
                Profile Info Layout
                <Profile username={this.props.match.params.username} />
            </div>
        )
    }

}

export default ProfileInfo