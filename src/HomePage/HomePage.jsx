import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';
import {itemActions} from "../_actions/item.actions";

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    test() {
        fetch('https://api.npms.io/v2/search?q=react')
            .then(response => response.json())
            .then(data => this.setState({ totalReactPackages: data.total }));
    }

    render() {
        const {user, users} = this.props;
        console.log("User: ", user)
        return (
            <>
                <div className="col-md-10 col-sm-offset-2">
                    <h1>Hi {user.firstName}!</h1>
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
                    {users.loading && <div><em>Loading users...</em>
                        <label>Error: </label>{users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    </div>}
                    <div className={'col-xs-6'}>
                        <h3>Your basic data is:</h3>
                        <div><label>First name: </label>{user.firstName &&
                        <span className="text-danger"> {user.firstName}</span>}</div>
                        <div><label>Last name: </label>{user.lastName &&
                        <span className="text-danger"> {user.lastName}</span>}</div>
                        <div><label>Username: </label>{user.username &&
                        <span className="text-danger"> {user.username}</span>}</div>
                        <div><label>Age: </label>{user.age && <span className="text-danger"> {user.age}</span>}</div>
                        <div><label>Occupation: </label>{user.occupation &&
                        <span className="text-danger"> {user.occupation}</span>}</div>
                    </div>
                    <div className={'col-xs-6'}>
                        <h3>Your location data is:</h3>
                        <div><label>Adress: </label>{user.adress && <span className="text-danger"> {user.adress}</span>}
                        </div>
                        <div><label>Country: </label>{user.country &&
                        <span className="text-danger"> {user.country}</span>}</div>
                        <div><label>City: </label>{user.city && <span className="text-danger"> {user.city}</span>}</div>
                        <div><label>Zip code: </label>{user.zipCode &&
                        <span className="text-danger"> {user.zipCode}</span>}</div>
                    </div>

                </div>
                <div>
                    <button
                        onClick={event => this.props.register()}
                    >Consult
                    </button>
                    {this.state.data && console.log("Data: ", this.state.data)}
                </div>
            </>
        );
    }
}

function mapState(state) {
    const {users, authentication, item} = state;
    const {user} = authentication;
    return {user, users, item};
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    register: itemActions.register
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
