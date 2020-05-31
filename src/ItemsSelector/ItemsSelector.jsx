import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Field} from "react-final-form";
import Select from 'react-select'

const ItemsSelector = ({
                           item
                       }) => {
    return (
        <div className={'row'}>
            <Field name="myField">
                {props => (
                    <div>
                        <label>Seleccione el producto que desea ofertar: </label>
                        <Select
                            id={props.id}
                            {...props.input}
                            {...props.rest}
                            options={item}
                            placeholder={'- Selecciona -'}
                            noOptionsMessage={() => 'Valores no disponibles'}
                            isSearchable
                        />
                    </div>
                )}
            </Field>
            {/*<Form>
                    <Form.Group controlId={'ofertante'}>
                        <Form.Label>
                            Seleccione el producto que desea ofertar:
                        </Form.Label>
                        <Form.Control as="select">
                            {Object.keys(item).map(i => <option value={item[0].name}>{item[0].name}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form>*/}
        </div>
    );
};

export default ItemsSelector;
