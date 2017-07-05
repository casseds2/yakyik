import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Home, ProfileInfo } from './components/layout'
import { CurrentUser } from './components/containers'
import { Provider } from 'react-redux'
import store from './stores/store'
import { BrowserRouter, Route} from 'react-router-dom'

const app = (
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

ReactDOM.render(app, document.getElementById('root'))