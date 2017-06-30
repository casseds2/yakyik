import React, { Component } from 'react'
import {Zone, CreateZone} from '../presentation'
import {APIManager} from '../../utils'
import { connect } from 'react-redux'
import { actions } from '../../actions'

class Zones extends Component{

    constructor(){
        super()
        this.state = {
        }
    }

    componentDidMount(){
        //console.log('Zones componentDidMount: ')
        this.props.fetchZones(null)
    }

    submitZone(zone){
        console.log('SUBMITTED ZONE: ' + JSON.stringify(zone))
        APIManager.post('/api/zone', zone, (err, response) => {
            if(err){
                alert('ERROR: ' + err.message)
                return
            }
            console.log('ZONE CREATED: ' + JSON.stringify(response))
            //Dispatch An Action
            const zone = response.results
            this.props.zoneCreated(zone)
        })
    }

    selectZone(index){
        this.props.selectedZone(index)
    }

    render(){

        const listItems = this.props.list.map((zone, i) => {
            let selected = (i==this.props.selected)
            return (
                <li key={i}>
                    <Zone index={i} select={this.selectZone.bind(this)}isSelected={selected} currentZone={zone}/>
                </li>
            )
        })

        let content = null
        if(this.props.appStatus == 'loading'){
            content = 'LOADING...'
        }
        else{
            content = (
                <div>
                    <ol>
                        {listItems}
                    </ol>
                    <CreateZone onCreate={this.submitZone.bind(this)}/>
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

/*The following are properties (props)*/

//This allows us use this.props.list...assigns state to property
const stateToProps = (state) => { //state here also knows as store
    return{
        appStatus: state.zone.appStatus,
        list: state.zone.list,
        selected: state.zone.selectedZone
    }
}

//Bad form to reference store directly so we use this function
const dispatchToProps = (dispatch) => {
    return{
        zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
        zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
        selectedZone: (index) => dispatch(actions.selectedZone(index)),
        fetchZones: (params) => dispatch(actions.fetchZones(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Zones)