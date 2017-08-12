import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../actions'
import Dropzone from 'react-dropzone'
import { APIManager } from '../../utils'
import sha1 from 'sha1'


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

    uploadImage(files){ //Uploads Array of Files
        const image = files[0]
        const cloudName = 'hiody6ehr' //From Cloudinary Dashboard
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload' //URL from http://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
        let timestamp = Date.now() / 1000
        const uploadPreset = 'cpi4wdvs'
        const paramsString = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'agpNQwxjQIVcT_AoK6s-C52wA6c'
        const signature = sha1(paramsString)
        const params = {
            'api_key': '937247372727724',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }
        APIManager.upload(url, image, params, (err, response) => {
            if(err){
                //console.log('UPLOAD ERROR: ' + JSON.stringify(err))
                alert(err)
                return
            }
            console.log('UPLOAD COMPLETE: ' + JSON.stringify(response.body))
            const imageUrl = response.body['secure_url']
            let updatedProfile = Object.assign({}, this.state.updatedProfile)
            updatedProfile['image'] = imageUrl
            this.setState({
                updatedProfile: updatedProfile
            })
        })
        //console.log('UploadedImage: ')
    }

    render(){
        const currentUser = this.props.user
        const image = (this.state.updatedProfile.image == null) ? '' : this.state.updatedProfile.image.replace('upload', 'upload/c_thumb,h_150,w_150,x_0,y_0') //thumbnail image
        return(
            <div>
                <h2> Welcome { currentUser.username } </h2>
                <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username"/><br/>
                <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender"/><br/>
                <input type="text" id="city" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} placeholder="City"/><br/>
                <img src={image} /><br />
                <Dropzone onDrop={this.uploadImage.bind(this)} />
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