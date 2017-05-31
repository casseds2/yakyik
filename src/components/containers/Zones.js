import React, { Component } from 'react'
import Zone from '../presentation/Zone'

class Zones extends Component{

    constructor(){
        super()
        this.state = {

            zone: {
              name: '',
              zipCodes: [],
              timestamp: ''
            },

            list: [
                {name:'Zone 1', zipCode: '1001', numComments:11},
                {name:'Zone 2', zipCode: '1002', numComments:12},
                {name:'Zone 3', zipCode: '1003', numComments:13},
                {name:'Zone 4', zipCode: '1004', numComments:14},
                {name:'Zone 5', zipCode: '1005', numComments:15}
            ]
        }
    }

    submitZone(){
        console.log('submitZone: ' + JSON.stringify(this.state.zone))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.zone)
        this.setState({
            list: updatedList
        })
    }

    updateName(event){
        console.log('updateZoneName: ' + event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone['name'] = event.target.value
        this.setState({
            zone: updatedZone
        })
    }

    updateZipCode(event){
        console.log('updateZipCode: ' + event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone['zipCodes'] = event.target.value
        this.setState({
            zone: updatedZone
        })
    }

    render(){

        const listItems = this.state.list.map((zone, i) => {
            return (
                <li key={i}><Zone currentZone={zone}/></li>
            )
        })

        return(
            <div>
                <ol>
                    {listItems}
                </ol>

                <input onChange={this.updateName.bind(this)} className="form-control" type="text" placeholder="Zone Name"/>
                <br/>
                <input onChange={this.updateZipCode.bind(this)} className="form-control" type="text" placeholder="Zip Code(s)"/>
                <br/>
                <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Zone</button>

            </div>
        )
    }
}

export default Zones