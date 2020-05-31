import {swopCartConstants} from '../_constants';
import {REQUEST} from "../utils/Request";

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
        case swopCartConstants.GET_ITEMS:
            return {
                ...state,
                getItems: action.getItems
            };
        case swopCartConstants.GET_ITEMS_ERROR:
            return {
                ...state,
                getItems: undefined
            };
        default:
            return state
    }
}
