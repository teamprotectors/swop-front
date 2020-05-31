import { alertActions } from './';
import { swopCartService } from "../_services";
import {swopCartConstants, userConstants} from "../_constants";

export const swopCartActions = {
    register,
    addSwopCart,
    deleteItemSwopCart
};

function register() {
    return dispatch => {
        swopCartService.register()
            .then(
                item => {
                    dispatch(success(item));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(item) { return { type: swopCartConstants.ITEM_OBTENIDO, item } }
    function failure(error) { return { type: swopCartConstants.ERROR, error } }
}

function addSwopCart(item) {
    return dispatch => {
        dispatch(addSuccess(item));
    };

    function addSuccess(item) { return { type: swopCartConstants.ADD_SWOPCART, item } }
}

function deleteItemSwopCart(item) {
    return dispatch => {
        dispatch(deleteItemSuccess(item));
    };

    function deleteItemSuccess(item) { return { type: swopCartConstants.DELETE_ITEM_SWOPCART, item } }
}

function sendSwopCart(swopCart) {
    return dispatch => {
        dispatch(pending());
        swopCartService.sendSwopCart(swopCart)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function pending() { return { type: swopCartConstants.PENDING_SEND_SWOPCART } }
    function success(item) { return { type: swopCartConstants.SEND_SWOPCART, item } }
    function failure(error) { return { type: swopCartConstants.ERROR_SEND_SWOPCART, error } }
}
