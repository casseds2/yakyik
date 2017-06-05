import React, { Component } from 'react'
import {Zone, CreateZone} from '../presentation'
import {APIManager} from '../../utils'

class Zones extends Component{

    constructor(){
        super()
        this.state = {
            list: [],
            selected: 0
        }
    }

    componentDidMount(){
        console.log('Zones componentDidMount: ')
        APIManager.get('/api/zone', null, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            this.setState({
                list: response.results
            })
        })
    }

    submitZone(zone){
        console.log('SUBMITTED ZONE: ' + JSON.stringify(zone))
        APIManager.post('/api/zone', zone, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            console.log('ZONE CREATED: ' + JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.results)
            this.setState({
                list: updatedList
            })
        })
    }

    selectZone(index){
        console.log('selectZone: ' + index)
        this.setState({
            selected: index
        })
    }

    render(){

        const listItems = this.state.list.map((zone, i) => {
            let selected = (i==this.state.selected)
            return (
                <li key={i}>
                    <Zone index={i} select={this.selectZone.bind(this)}isSelected={selected} currentZone={zone}/>
                </li>
            )
        })

        return(
            <div>
                <ol>
                    {listItems}
                </ol>
                <CreateZone onCreate={this.submitZone.bind(this)}/>
            </div>
        )
    }
}

export default Zones