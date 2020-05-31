import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {userActions} from '../_actions';
import {itemActions} from "../_actions/item.actions";
import ItemsSelector from "../ItemsSelector/ItemsSelector";
import {Form, Field} from 'react-final-form'
import {Button} from 'react-bootstrap';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.register();
    }

    handleSubmit(event) {
        console.log("Values: ", event)
    }

    claveValor(item) {
        return item && Object.keys(item).map(i => {return {
            value: item[i].id,
            label: item[i].name
        }})
    }

    render() {
        const {user, users, item} = this.props;
        return (
            <>
                <div className={'row'}>
                    <div className="col-md-10 col-sm-offset-2">
                        <h1>Hi {user.firstName}!</h1>
                        <p>
                            <Link to="/login">Logout</Link>
                        </p>
                        {users.loading && <div><em>Loading users...</em>
                            <label>Error: </label>{users.error &&
                            <span className="text-danger">ERROR: {users.error}</span>}
                        </div>}
                        <div className={'col-xs-6'}>
                            <h3>Your basic data is:</h3>
                            <div><label>First name: </label>{user.firstName &&
                            <span className="text-danger"> {user.firstName}</span>}</div>
                            <div><label>Last name: </label>{user.lastName &&
                            <span className="text-danger"> {user.lastName}</span>}</div>
                            <div><label>Username: </label>{user.username &&
                            <span className="text-danger"> {user.username}</span>}</div>
                            <div><label>Age: </label>{user.age && <span className="text-danger"> {user.age}</span>}
                            </div>
                            <div><label>Occupation: </label>{user.occupation &&
                            <span className="text-danger"> {user.occupation}</span>}</div>
                        </div>
                        <div className={'col-xs-6'}>
                            <h3>Your location data is:</h3>
                            <div><label>Adress: </label>{user.adress &&
                            <span className="text-danger"> {user.adress}</span>}
                            </div>
                            <div><label>Country: </label>{user.country &&
                            <span className="text-danger"> {user.country}</span>}</div>
                            <div><label>City: </label>{user.city && <span className="text-danger"> {user.city}</span>}
                            </div>
                            <div><label>Zip code: </label>{user.zipCode &&
                            <span className="text-danger"> {user.zipCode}</span>}</div>
                        </div>
                    </div>
                </div>
                <div className={'row'}><br/><br/>
                    <Form
                        onSubmit={this.handleSubmit}
                        render={finalFormProps => {
                            return (
                                <form onSubmit={finalFormProps.handleSubmit}>
                                    <ItemsSelector
                                        item={this.claveValor(item)}
                                    />
                                    <Button id="continuarDatosPersonales" name="continuarDatosPersonales" type="submit">
                                        Continuar
                                    </Button>
                                </form>
                            );
                        }}
                    />
                </div>
            </>
        );
    }
}

function mapState(state) {
    return {
        users: R.pathOr(undefined, ['users'])(state),
        authentication: R.pathOr(undefined, ['authentication'])(state),
        item: R.pathOr(undefined, ['item'])(state),
        user: R.pathOr(undefined, ['authentication', 'user'])(state),
    }
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    register: itemActions.register
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
