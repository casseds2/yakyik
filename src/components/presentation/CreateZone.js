import React, { Component } from 'react'

class CreateZone extends Component{

    constructor(){
        super()
        this.state = {
            zone: {
                name: '',
                zipCode: ''
            }
        }
    }

    updateZone(event){
        //console.log('UpdateZone: ' + event.target.id + '==' + event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone[event.target.id] = event.target.value
        this.setState({
            zone: updatedZone
        })
    }

    submitZone(event){
        console.log('SubmitZone: ' + JSON.stringify(this.state.zone))
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
        this.props.onCreate(updatedZone)
    }

    render(){
        return(
            <div>
                <h3>Create Zone</h3>
                <input onChange={this.updateZone.bind(this)}  id="name" className="form-control" type="text" placeholder="Zone Name"/>
                <br/>
                <input onChange={this.updateZone.bind(this)}  id="zipCode" className="form-control" type="text" placeholder="Zip Code"/>
                <br/>
                <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Zone</button>
            </div>
        )
    }
}

export default CreateZone