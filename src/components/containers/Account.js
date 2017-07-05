import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { actions } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Account extends Component{

    constructor(){
        super()
        this.state = {
            profile: {
                username: '',
                password: '',
                city: '',
                gender: ''
            }
        }
    }

    componentDidMount(){
        APIManager.get('/account/currentuser', null, (err, response) => {
            if(err){
                //alert(err.message) //Not Logged In Error
                return
            }
            //console.log('Account Component Did Mount: ' + JSON.stringify(response))
            this.props.currentUserReceived(response.user)
        })
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
            this.props.currentUserReceived(response.user) //Updates state which updates container
        })
    }

    logout(event){
        event.preventDefault()
        console.log('logout: ')
        APIManager.get('/account/logout', null, (err, response) => {
            if(err){
                alert(err.message)
                return
            }
            console.log(JSON.stringify(response))
            this.props.currentUserReceived(null) //Able to reuse this here
        })
    }

    updateProfile(event){
        event.preventDefault()
        console.log(event.target.id + ' == ' + event.target.value)
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
        const city = this.state.profile.city
        const gender = this.state.profile.gender
        if(username.length == 0){
            alert('Please Enter Your Username')
            return
        }
        if(password.length == 0){
            alert('Please Enter a Password')
            return
        }
        if(city.length == 0){
            alert('Please Enter a City')
            return
        }
        if(gender.length == 0){
            alert('Please Enter a Gender')
            return
        }

        APIManager.post('/account/register', this.state.profile, (err, response) => {
            if(err){
                alert(err.message)
                return
            }
            console.log(JSON.stringify(response))
            this.props.currentUserReceived(response.user) //Able to reuse this here
        })
    }

    render(){
        let content = null
        if(this.props.user == null){
            content =
                <div>
                <h2>Login</h2>
                <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username"/><br/>
                <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password"/><br/>
                <button onClick={this.login.bind(this)}>Log In</button>
                <br/>
                <h2>Register</h2>
                <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username"/><br/>
                <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password"/><br/>
                <input id="city" onChange={this.updateProfile.bind(this)} type="text" placeholder="city"/><br/>
                <input id="gender" onChange={this.updateProfile.bind(this)} type="text" placeholder="gender"/><br/>
                <button onClick={this.register.bind(this)}>Join</button>
                <br/>
            </div>
        }
        else{
            content = (
                <div>
                    <h2>Welcome {this.props.user.username}!</h2>
                    <span>{this.props.user.city}</span><br />
                    <button onClick={this.logout.bind(this)}>Log Out</button>
                    <Link to="/currentuser"><button>Account</button></Link>
                </div>
            )
        }
        return(
            <div>
                { content }
            </div>
        )
    }
}

/*State Variables To Properties*/
const stateToProps = (state) => { //state may also be known as store...convention to call state
    return{
        user: state.account.user
    }
}

/*Store Variables To Properties*/
const dispatchToProps = (dispatch) => {
    return{
        currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
    }
}

export default connect(stateToProps, dispatchToProps) (Account)