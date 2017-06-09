import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Profile extends Component{

    constructor(){
        super()
        this.state = {
            profile: null
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
            console.log('received Profile: ' + JSON.stringify(profile))
            this.setState({
                profile: profile
            })
        })
    }

    render(){

        const header = (this.state.profile == null) ? null : <h3>{this.state.profile._id}</h3>
        return(
            <div>
                {header}
            </div>
        )
    }
}

export default Profile