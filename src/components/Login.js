/**
 * Created by bikramkawan on 9/1/17.
 */
import React, {Component} from 'react';
import {firebaseApp} from '../Firebase'

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    login = ()=> {

        const {email, password} = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error=> this.setState({error}))
    }
    render() {
        return (
            <div className="container" style={{margin: '5%'}}>
                <div className="form-group">
                    <input type="text"
                           placeholder="Enter Email"
                           className="form-control"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({email: target.value})}
                    />
                    <input type="text"
                           placeholder="Enter Password"
                           className="form-control"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({password: target.value})}
                    />


                    <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.login}>Login</button>

                </div>
            </div>


        )


    }


}

export default Login;