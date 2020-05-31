import {swopCartConstants} from '../_constants';

export function swopCart(state = {}, action) {
    switch (action.type) {
        case swopCartConstants.ITEM_OBTENIDO:
            // remove deleted user from state
            console.log('Action: ', action)
            return {
                ...state,
                itemsStock: {...action.item}
            };
        case swopCartConstants.ADD_SWOPCART:
            return {
                ...state,
                cart: {...action.item}
            };
        case swopCartConstants.DELETE_ITEM_SWOPCART:
            return {
                ...state,
                cart: {...action.item}
            };
        case swopCartConstants.PENDING_SEND_SWOPCART:
            return {
                ...state,
                stateSendSwopCart: REQUEST.PENDING
            };
        case swopCartConstants.SEND_SWOPCART:
            return {
                ...state,
                stateSendSwopCart: REQUEST.SUCCESS
            };
        case swopCartConstants.ERROR_SEND_SWOPCART:
            return {
                ...state,
                stateSendSwopCart: REQUEST.ERROR
            };
        default:
            return state
    }
}
