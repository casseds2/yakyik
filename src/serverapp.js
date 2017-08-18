import React, { Component } from 'react'
import { Home, ProfileInfo } from './components/layout'
import { CurrentUser } from './components/containers'
import { Provider } from 'react-redux'
import store from './stores/store'
import { BrowserRouter, Route, Router} from 'react-router-dom'
//import { Router, Route, browserHistory } from 'react-router'

class App extends Component{
    render(){
        return(
            <Provider store={ store.configureStore() }>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/profile/:username' component={ProfileInfo}></Route>
                        <Route path='/currentuser' component={CurrentUser}></Route>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App
