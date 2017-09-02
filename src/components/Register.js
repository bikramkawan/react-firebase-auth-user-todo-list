/**
 * Created by bikramkawan on 9/1/17.
 */
import React, {Component} from 'react';
import {firebaseApp,users} from '../Firebase'

class Register extends Component {


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


    register = ()=> {
        console.log(this.state);
        const {email, password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=> {
                console.log(user)
                const thisUser = users.child(user.uid);
                const userdetail = thisUser.child('userdetail');
                const dataToInsert = {email: user.email, userid: user.uid};
                userdetail.set(dataToInsert)
            })
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

                    <button
                        className="btn btn-primary"
                        style={{margin: '10px'}}
                        onClick={this.register}
                    >
                        Register
                    </button>

                    <div>{this.state.error.message}</div>

                </div>
            </div>


        )


    }


}

export default Register ;