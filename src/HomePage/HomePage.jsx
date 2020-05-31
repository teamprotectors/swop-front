import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {userActions} from '../_actions';
import {swopCartActions} from "../_actions/swopCart.actions";
import ItemsSelector from "../ItemsSelector/ItemsSelector";
import {Form, Field} from 'react-final-form'
import {Button} from 'react-bootstrap';
import '../../assets/css/StylesHome.css'

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            swopCart: undefined,
            publish: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.viewSwopCart = this.viewSwopCart.bind(this);
    }


    componentDidMount() {
        this.props.getUsers();
        this.props.register();
    }

    idsForm() {
        return ['itemOffer', 'itemGet', 'quantity'];
    }

    cleanForm(mutators) {
        this.idsForm().map(it => mutators.cleanField(it));
    }

    handleSubmit(event, user, items, mutators, cart, actionAddSwopCart) {
        const swopCart = this.state.swopCart;
        const itemsGet = this.searchItem(event.itemGet, items);

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
                idUser: user.id.toString(),
                items: [{
                    name: event.itemOffer.label,
                    quantity: event.quantity,
                    isInterchangeable: true,
                    wishItems: [
                        ...itemsGet
                    ]
                }]
            };

        this.setState({
            swopCart: swopCart ? {
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
                }
        });

        this.cleanForm(mutators);
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

    viewSwopCart(actionDeleteSwopCart) {
        return <div className={'row'}>
            <br/><br/>
            <div><label>Sus productos agregados son: </label><br/><br/></div>
            {this.state.swopCart.items.map((itm, o) =>
                <div key={o}>
                    <label>Nombre: {itm.name}</label>
                    <Button onClick={() => this.deleteItem(o, actionDeleteSwopCart)}>Eliminar item</Button><br/><br/>
                </div>
            )}
        </div>
    }

    deleteItem(index, actionDeleteSwopCart) {
        this.state.swopCart.items.splice(index, 1);
        actionDeleteSwopCart(this.state.swopCart)
    }

    saveCart(swopCart, actionSendSwopCart) {
        actionSendSwopCart(swopCart);
    }

    viewStock(actionGetItems) {
        actionGetItems();
    }

    convertirGetItems(getItems) {
        const pr0 = Object.keys(getItems).map(i => getItems[i])
        return pr0.map(gi =>
            <div key={gi} className="card"><br/><br/>
                <img className="pr card-img-top" src="src/utils/supermarket .png" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{gi.id}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk
                        of
                        the card's content.</p>
                    <Button href="#" className="btn btn-primary">Go somewhere</Button>
                </div>
            </div>
        );
    }

    render() {
        const {user, users, itemsStock, cart, getItems} = this.props;
        return (
            <>
                <div className={'row'}>
                    <div className="col-md-10 col-sm-offset-2">
                        <h1>Hola {user.firstName}!</h1>
                        <p>
                            <Link to="/login">Cerrar sesión</Link>
                        </p>
                        {users.loading && <div><em>Cargando usearios...</em>
                            <label>Error: </label>{users.error &&
                            <span className="text-danger">ERROR: {users.error}</span>}
                        </div>}
                        <div className={'col-xs-6'}>
                            <h3>Sus datos básicos son:</h3>
                            <div><label>Nombre: </label>{user.firstName &&
                            <span className="text-danger"> {user.firstName}</span>}</div>
                            <div><label>Apellido name: </label>{user.lastName &&
                            <span className="text-danger"> {user.lastName}</span>}</div>
                            <div><label>Username: </label>{user.username &&
                            <span className="text-danger"> {user.username}</span>}</div>
                            <div><label>Edad: </label>{user.age && <span className="text-danger"> {user.age}</span>}
                            </div>
                            <div><label>Ocupación: </label>{user.occupation &&
                            <span className="text-danger"> {user.occupation}</span>}</div>
                        </div>
                        <div className={'col-xs-6'}>
                            <h3>Sus datos de localización son:</h3>
                            <div><label>Dirección: </label>{user.adress &&
                            <span className="text-danger"> {user.adress}</span>}
                            </div>
                            <div><label>Pais: </label>{user.country &&
                            <span className="text-danger"> {user.country}</span>}</div>
                            <div><label>Ciudad: </label>{user.city && <span className="text-danger"> {user.city}</span>}
                            </div>
                            <div><label>Código Zip: </label>{user.zipCode &&
                            <span className="text-danger"> {user.zipCode}</span>}</div>
                        </div>
                    </div>
                </div>
                <div className={'row text-center'}>
                    <h2>¿Deseas publicar productos o quieres ver que hay disponible?</h2>
                    <div className={'row'}>
                        <div className='col-sm-4 col-sm-offset-2'>
                            <Button onClick={() => this.setState({publish: !this.state.publish})}>Publicar</Button>
                        </div>
                        <div className='col-sm-4'>
                            <Button onClick={() => {
                                this.setState({publish: false})
                                this.props.getItemsStock()
                            }}>Ver disponibles</Button>
                        </div>
                    </div>
                </div>
                {this.state.publish &&
                <>
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
                                        <div className={'row'}>
                                            <div className={'col-sm-4 col-sm-offset-2'}>
                                        <Button id="addToCart"
                                                name="addToCart"
                                                type="button"
                                                onClick={() => this.handleSubmit(finalFormProps.values,
                                                    user,
                                                    itemsStock,
                                                    finalFormProps.form.mutators,
                                                    cart,
                                                    this.props.addSwopCart)}>
                                            Agregar
                                        </Button>
                                            </div>
                                            <div className={'col-sm-4'}>
                                        <Button id="addToCart"
                                                name="addToCart"
                                                type="button"
                                                onClick={() => this.saveCart(
                                                    cart,
                                                    this.props.sendSwopCart)}>
                                            Guardar carro
                                        </Button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        />
                    </div>
                </>
                }
                {this.state.swopCart && this.viewSwopCart(this.props.deleteItemSwopCart)}
                {this.state.viewStock && this.viewStock(this.props.getItemsStock)}
                {getItems && this.convertirGetItems(getItems)}

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
        getItems: R.pathOr(undefined, ['swopCart', 'getItems'])(state),
    }
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    register: swopCartActions.register,
    addSwopCart: swopCartActions.addSwopCart,
    deleteItemSwopCart: swopCartActions.deleteItemSwopCart,
    sendSwopCart: swopCartActions.sendSwopCart,
    getItemsStock: swopCartActions.getItemsStock,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
