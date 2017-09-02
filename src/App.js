import React, {Component} from 'react';
import logo from './logo.svg';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import {firebaseApp} from './Firebase';
import Dashboard from './components/Dashboard'

class App extends Component {

    constructor() {
        super();
        this.state = {
            authed: false,
            userid: null,
            email: null
        }
    }


    componentDidMount() {
        this.removeFirebaseEvent = firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({authed: true, userid: user.uid, email: user.email})


            } else {
                this.setState({
                    authed: false,
                })
            }
        })

    }


    logout = ()=> {
        firebaseApp.auth().signOut();
    }

    componentWillUnmount() {
        this.removeFirebaseEvent()
    }

    render() {
        return (
            <HashRouter>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>React Firebase Authentication User Based Todo List </h2>
                    </div>

                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container">

                            <ul className="nav navbar-nav pull-right">

                                <li>
                                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                                </li>
                                <li>
                                    {this.state.authed
                                        ? <button
                                        style={{border: 'none', background: 'transparent'}}
                                        className="navbar-brand" onClick={this.logout}>Logout</button>
                                        : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {!this.state.authed ? <div className="container"><h3>Please login if you are existing user.</h3>
                        <hr/>
                        <h3> Please register if you are not registered to use the app.</h3>
                    </div> : ''}
                    <div>
                        <Route path='/' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <div></div>}/>
                        <Route path='/login' render={()=>this.state.authed ? <Redirect to='/dashboard'/> : <Login/>}/>
                        <Route path='/dashboard'
                               render={()=>this.state.authed ?
                                   <Dashboard userid={this.state.userid} email={this.state.email}/> :
                                   <Redirect to='/login'/>}/>
                        <Route path='/register' component={Register}/>
                    </div>

                </div>
            </HashRouter>
        );
    }
}

export default App;
