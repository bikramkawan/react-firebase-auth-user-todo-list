/**
 * Created by bikramkawan on 9/1/17.
 */
import React, {Component} from 'react';
import {usersWishlist} from '../Firebase'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wishlist: '',
            completeWishlist: []
        }

    }

    removeWishlist = (index) => {
        const {userid} = this.props;
        const thisUser = usersWishlist.child(userid);
        let completeWishlist = this.state.completeWishlist.slice();
        completeWishlist.splice(index,1)
        this.setState({completeWishlist: completeWishlist})
        thisUser.set({completeWishlist});

    }

    addWishlist = ()=> {
        const {userid} = this.props;
        const thisUser = usersWishlist.child(userid);
        const {wishlist} = this.state;
        const {completeWishlist} = this.state;
        completeWishlist.push(wishlist);
        this.setState({completeWishlist: completeWishlist})
        thisUser.set({completeWishlist});

    }


    componentDidMount() {
        const {userid} = this.props;
        const thisUser = usersWishlist.child(userid);
        thisUser.on('value', (snap, i)=> {
            snap.forEach((d, i)=> this.setState({completeWishlist: d.val()}))

        })

    }

    renderWishlist() {
        return this.state.completeWishlist.map((item, index)=> {
            return (
                <li className="list-group-item" key={index}>{item}
                    <button className="btn btn-danger" style={{margin: '10px'}}
                            onClick={this.removeWishlist.bind(this,index)}> Delete
                    </button>

                </li>
            )
        })

    }


    render() {
        console.log(this.state)
        return (

            <div className="container" style={{margin: '5%'}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input className="form-control"
                                   placeholder="What is your Wishlist ?"
                                   onChange={({target})=>this.setState({wishlist: target.value})}
                            />
                            <button className="btn btn-primary"
                                    style={{margin: '15px'}}
                                    onClick={this.addWishlist}
                            >Add To Wishlist
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-group">
                            {this.renderWishlist()}

                        </ul>
                    </div>
                </div>

            </div>


        )


    }


}

export default Dashboard;