import React, { Component } from 'react'
import { Zones, Comments, Account } from '../containers'

class Home extends Component{

    render(){
        console.log('Home Component Rendering')
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Account />
                        <Zones />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home