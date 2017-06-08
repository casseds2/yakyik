import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Account extends Component{

    constructor(){
        super()
        this.state = {
            profile: {
                username: '',
                password: ''
            }
        }
    }

    login(event){
        event.preventDefault()
        console.log('login: ' + JSON.stringify(this.state.profile))
        const username = this.state.profile.username
        const password = this.state.profile.password
        if(username.length == 0){
            alert('Please Enter Your Username')
            return
        }
        if(password.length == 0){
            alert('Please Enter a Password')
            return
        }

        APIManager.post('/account/login', this.state.profile, (err, response) => {
            if(err){
                alert(err.message)
                return
            }
            console.log(JSON.stringify(response))
        })
    }

    updateProfile(event){
        event.preventDefault()
        //console.log(event.target.id + ' == ' + event.target.value)
        let updatedProfile = Object.assign({}, this.state.profile)
        updatedProfile[event.target.id] = event.target.value
        this.setState({
            profile: updatedProfile
        })
    }

    register(event){
        event.preventDefault()
        console.log('register: ' + JSON.stringify(this.state.profile))
        const username = this.state.profile.username
        const password = this.state.profile.password
        if(username.length == 0){
            alert('Please Enter Your Username')
            return
        }
        if(password.length == 0){
            alert('Please Enter a Password')
            return
        }

        APIManager.post('/account/register', this.state.profile, (err, response) => {
            if(err){
                alert(err.message)
                return
            }
            console.log(JSON.stringify(response))
        })
    }

    render(){
        return(
            <div>
                <h2>Login</h2>
                <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username"/><br/>
                <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password"/><br/>
                <button onClick={this.login.bind(this)}>Log In</button>
                <br/>
                <h2>Register</h2>
                <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username"/><br/>
                <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password"/><br/>
                <button onClick={this.register.bind(this)}>Join</button>
                <br/>
            </div>
        )
    }
}

export default Account