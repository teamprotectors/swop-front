import { alertActions } from './';
import { itemService } from "../_services";
import {itemConstants, userConstants} from "../_constants";

export const itemActions = {
    register,
};

function register() {
    return dispatch => {
        itemService.register()
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

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(item) { return { type: itemConstants.ITEM_OBTENIDO, item } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
