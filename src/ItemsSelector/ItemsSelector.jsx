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
                            <label>Seleciona el producto que quieres ofertar: </label>
                            <Select
                                id={props.id}
                                {...props.input}
                                {...props.rest}
                                options={itemsStock}
                                placeholder={'- Select -'}
                                noOptionsMessage={() => 'Values ​​not available'}
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
                                <label>Producto que quieres cambiar: </label>
                                <Select
                                    id={props.id}
                                    {...props.input}
                                    {...props.rest}
                                    options={itemsStock}
                                    placeholder={'- Seleccionar -'}
                                    noOptionsMessage={() => 'Values ​​not available'}
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
                                <label>Cantidad del producto que vas a ofertar: </label>
                                <input
                                    id={props.id}
                                    {...props.input}
                                    {...props.rest}
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="- Seleccionar - "
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
