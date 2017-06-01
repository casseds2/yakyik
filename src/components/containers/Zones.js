import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'

class Zones extends Component{

    constructor(){
        super()
        this.state = {

            zone: {
              name: '',
              zipCode: '',
              timestamp: ''
            },

            list: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount: ')
        superagent
            .get('/api/zone')
            .query(null)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if(err){
                    alert('ERROR: ' + err)
                    return
                }
                console.log(JSON.stringify(response.body))
                let results = response.body.results
                this.setState({
                    list: results
                })
            })
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
        updatedZone['zipCode'] = event.target.value
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
                <input onChange={this.updateZipCode.bind(this)} className="form-control" type="text" placeholder="Zip Code"/>
                <br/>
                <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Zone</button>

            </div>
        )
    }
}

export default Zones