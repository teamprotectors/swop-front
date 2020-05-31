import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                age: '',
                occupation: '',
                adress: '',
                country: '',
                city: '',
                zipCode: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const {registering} = this.props;
        const {user, submitted} = this.state;
        return (
            <div>
                <h2>Registro</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'row'}>
                        <div className={'col-xs-6'}>
                            <br/><label htmlFor="basicData">Información Básica</label><br/><br/>
                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                <label htmlFor="firstName">Primer nombre</label>
                                <input type="text" className="form-control" name="firstName" value={user.firstName}
                                       onChange={this.handleChange}/>
                                {submitted && !user.firstName &&
                                <div className="help-block">Primer nombre es requerido</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <label htmlFor="lastName">Apellido</label>
                                <input type="text" className="form-control" name="lastName" value={user.lastName}
                                       onChange={this.handleChange}/>
                                {submitted && !user.lastName &&
                                <div className="help-block">Apellido requerido</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <label htmlFor="username">Usuario</label>
                                <input type="text" className="form-control" name="username" value={user.username}
                                       onChange={this.handleChange}/>
                                {submitted && !user.username &&
                                <div className="help-block">Usuario requerido</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.age ? ' has-error' : '')}>
                                <label htmlFor="age">Edad</label>
                                <input type="number" className="form-control" name="age" value={user.age}
                                       onChange={this.handleChange}/>
                                {submitted && !user.age &&
                                <div className="help-block">Edad requerida</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.occupation ? ' has-error' : '')}>
                                <label htmlFor="occupation">Contraseña</label>
                                <input type="text" className="form-control" name="occupation" value={user.occupation}
                                       onChange={this.handleChange}/>
                                {submitted && !user.occupation &&
                                <div className="help-block">Contraseña requerida</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control" name="password" value={user.password}
                                       onChange={this.handleChange}/>
                                {submitted && !user.password &&
                                <div className="help-block">Contraseña requerida</div>
                                }
                            </div>
                        </div>
                        <div className={'col-xs-6'}>
                            <br/><label htmlFor="locationData">Información de ubicacion</label><br/><br/>
                            <div className={'form-group' + (submitted && !user.adress ? ' has-error' : '')}>
                                <label htmlFor="adress">Dirección</label>
                                <input type="text" className="form-control" name="adress" value={user.adress}
                                       onChange={this.handleChange}/>
                                {submitted && !user.adress &&
                                <div className="help-block">Dirección requerida</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                                <label htmlFor="country">País</label>
                                <input type="text" className="form-control" name="country" value={user.country}
                                       onChange={this.handleChange}/>
                                {submitted && !user.country &&
                                <div className="help-block">País requerida</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.city ? ' has-error' : '')}>
                                <label htmlFor="city">Ciudad</label>
                                <input type="text" className="form-control" name="city" value={user.city}
                                       onChange={this.handleChange}/>
                                {submitted && !user.city &&
                                <div className="help-block">Ciudad requerida</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.zipCode ? ' has-error' : '')}>
                                <label htmlFor="zipCode">codigo Postal</label>
                                <input type="number" className="form-control" name="zipCode" value={user.zipCode}
                                       onChange={this.handleChange}/>
                                {submitted && !user.zipCode &&
                                <div className="help-block">codigo Postal requerida</div>
                                }
                            </div>
                        </div>
                    </div><br/>
                    <div className={'row text-center'}>
                        <div className="form-group">
                            <button className="btn btn-primary">Registar</button>
                            {registering &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            }
                            <Link to="/login" className="btn btn-link">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const {registering} = state.registration;
    return {registering};
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
