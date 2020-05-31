import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Field} from "react-final-form";
import Select from 'react-select'

const ItemsSelector = ({
                           itemsStock, values
                       }) => {
    return (
        <>
            <div className={'row'}>
                <Field name="itemOffer">
                    {props => (
                        <div>
                            <label>Seleccione el producto a ofertar: </label>
                            <Select
                                id={props.id}
                                {...props.input}
                                {...props.rest}
                                options={itemsStock}
                                placeholder={'- Seleccione -'}
                                noOptionsMessage={() => 'Valores no disponibles'}
                                isSearchable
                            />
                        </div>
                    )}
                </Field>
            </div>
            <br/><br/>
            {values.itemOffer &&
            <>
                <div className={'row'}>
                    <Field name="itemGet">
                        {props => (
                            <div>
                                <label>Seleccione los productos que desea obtener: </label>
                                <Select
                                    id={props.id}
                                    {...props.input}
                                    {...props.rest}
                                    options={itemsStock}
                                    placeholder={'- Seleccionar -'}
                                    noOptionsMessage={() => 'Valores no disponibles'}
                                    isSearchable
                                    isMulti
                                />
                            </div>
                        )}
                    </Field>
                </div><br/><br/>
                <div className={'row'}>
                    <Field name="quantity">
                        {props => (
                            <div>
                                <label>Cantidad: </label>
                                <input
                                    id={props.id}
                                    {...props.input}
                                    {...props.rest}
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="- Seleccione - "
                                />
                            </div>
                        )}
                    </Field>
                </div>
            </>
            }
            <br/><br/></>
    );
};

export default ItemsSelector;
