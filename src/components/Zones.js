import React, { Component } from 'react'
import Zone from './Zone'

class Zones extends Component{

    constructor(){
        super()
        this.state = {
            list: [
                {name:'Zone 1', zipCode: '1001', numComments:11},
                {name:'Zone 2', zipCode: '1002', numComments:12},
                {name:'Zone 3', zipCode: '1003', numComments:13},
                {name:'Zone 4', zipCode: '1004', numComments:14},
                {name:'Zone 5', zipCode: '1005', numComments:15}
            ]
        }
    }

    render(){

        const listItems = this.state.list.map((zone, i) => {
            return (
                <li><Zone currentZone={zone}/></li>
            )
        })

        return(
            <div>
                <ol>
                    {listItems}
                </ol>
            </div>
        )
    }
}

export default Zones