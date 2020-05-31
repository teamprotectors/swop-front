import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {userActions} from '../_actions';
import {swopCartActions} from "../_actions/swopCart.actions";
import ItemsSelector from "../ItemsSelector/ItemsSelector";
import {Form, Field} from 'react-final-form'
import {Button} from 'react-bootstrap';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            swopCart: undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.viewSwopCart = this.viewSwopCart.bind(this);
    }


    componentDidMount() {
        this.props.getUsers();
        this.props.register();
    }

    idsForm () {
        return ['itemOffer', 'itemGet', 'quantity'];
    }

    cleanForm (mutators) {
        this.idsForm().map(it => mutators.cleanField(it));
    }

    handleSubmit(event, user, items, mutators, cart, actionAddSwopCart) {
        const swopCart = this.state.swopCart;
        const itemsGet  = this.searchItem(event.itemGet, items);
        console.log("swopCart: ", cart)

        const addSwopCart = cart && Object.keys(items).length > 0 ? {
                ...cart,
                items: [
                    ...cart.items,
                    {
                        name: event.itemOffer.label,
                        quantity: event.quantity,
                        isInterchangeable: true,
                        wishItems: [
                            ...itemsGet
                        ]
                    }
                ]
            }
            : {
                idUser: user.id,
                items: [{
                    name: event.itemOffer.label,
                    quantity: event.quantity,
                    isInterchangeable: true,
                    wishItems: [
                        ...itemsGet
                    ]
                }]
            };

        this.setState({swopCart: swopCart ? {
                ...swopCart,
                items: [
                    ...swopCart.items,
                    {
                        name: event.itemOffer.label,
                        quantity: event.quantity,
                        isInterchangeable: true,
                        wishItems: [
                            ...event.itemGet
                        ]
                    }
                ]
        }
             : {
                    idUser: user.id,
                    items: [{
                        name: event.itemOffer.label,
                        quantity: event.quantity,
                        isInterchangeable: true,
                        wishItems: [
                            ...itemsGet
                        ]
                    }]
                }});

        this.cleanForm(mutators);
        console.log("addSwopCart: ", addSwopCart)
        actionAddSwopCart(addSwopCart);
    }

    searchItem(listItems, items) {
        const itemRebuilt = Object.keys(items).map(i => items[i]);
        return listItems ? listItems.map(li => itemRebuilt.find(i => i.id === li.value)) : [];
    }

    claveValor(item) {
        return item && Object.keys(item).map(i => {
            return {
                value: item[i].id,
                label: item[i].name
            }
        })
    }

    viewSwopCart(actionDeleteSwopCart){
        return <div className={'row'}>
            <br/><br/><div><label>Your barter products are: </label><br/><br/></div>
            {this.state.swopCart.items.map((itm,o) =>
                <div key={o}>
                    <label>Name: {itm.name}</label>
                    <Button onClick={() => this.deleteItem(o, actionDeleteSwopCart)}>Delete item</Button><br/><br/>
                </div>
            )}
        </div>
    }

    deleteItem(index, actionDeleteSwopCart){
        this.state.swopCart.items.splice(index, 1);
        actionDeleteSwopCart(this.state.swopCart)
    }

    render() {
        const {user, users, itemsStock, cart} = this.props;
        return (
            <>
                <div className={'row'}>
                    <div className="col-md-10 col-sm-offset-2">
                        <h1>Hola {user.firstName}!</h1>
                        <p>
                            <Link to="/login">Cerrar sesión</Link>
                        </p>
                        {users.loading && <div><em>Loading users...</em>
                            <label>Error: </label>{users.error &&
                            <span className="text-danger">ERROR: {users.error}</span>}
                        </div>}
                        <div className={'col-xs-6'}>
                            <h3>Tu información básica es:</h3>
                            <div><label>Nombre: </label>{user.firstName &&
                            <span className="text-danger"> {user.firstName}</span>}</div>
                            <div><label>Apellido: </label>{user.lastName &&
                            <span className="text-danger"> {user.lastName}</span>}</div>
                            <div><label>Usuario: </label>{user.username &&
                            <span className="text-danger"> {user.username}</span>}</div>
                            <div><label>Edad: </label>{user.age && <span className="text-danger"> {user.age}</span>}
                            </div>
                            <div><label>Ocupación: </label>{user.occupation &&
                            <span className="text-danger"> {user.occupation}</span>}</div>
                        </div>
                        <div className={'col-xs-6'}>
                            <h3>Tu informacion ubicación es:</h3>
                            <div><label>País: </label>{user.country &&
                            <span className="text-danger"> {user.country}</span>}</div>
                            <div><label>Ciudad: </label>{user.city && <span className="text-danger"> {user.city}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'row'}><br/><br/>
                    <Form
                        onSubmit={this.handleSubmit}
                        mutators={{
                            cleanField: (args, state, utils) => {
                                utils.changeValue(state, args[0], () => '');
                            },
                        }}
                        render={finalFormProps => {
                            return (
                                <form onSubmit={finalFormProps.handleSubmit}>
                                    <ItemsSelector
                                        {...finalFormProps}
                                        itemsStock={this.claveValor(itemsStock)}
                                        user={user}
                                    />
                                    <Button id="addToCart"
                                            name="addToCart"
                                            type="button"
                                            onClick={() => this.handleSubmit(finalFormProps.values,
                                                user,
                                                itemsStock,
                                                finalFormProps.form.mutators,
                                                cart,
                                                this.props.addSwopCart)}>
                                        Agregar al carrito de truque
                                    </Button>
                                </form>
                            );
                        }}
                    />
                </div>
                {this.state.swopCart && this.viewSwopCart(this.props.deleteItemSwopCart)}
            </>
        );
    }
}

function mapState(state) {
    return {
        users: R.pathOr(undefined, ['users'])(state),
        authentication: R.pathOr(undefined, ['authentication'])(state),
        itemsStock: R.pathOr(undefined, ['swopCart', 'itemsStock'])(state),
        user: R.pathOr(undefined, ['authentication', 'user'])(state),
        cart: R.pathOr(undefined, ['swopCart', 'cart'])(state),
    }
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    register: swopCartActions.register,
    addSwopCart: swopCartActions.addSwopCart,
    deleteItemSwopCart: swopCartActions.deleteItemSwopCart,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
