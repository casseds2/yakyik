import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileInfo extends Component{

    render(){

        return(
            <div>
                Profile Info Layout
                <Profile username={this.props.params.username} />
            </div>
        )
    }

}

export default ProfileInfo