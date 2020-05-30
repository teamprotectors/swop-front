import {itemConstants} from '../_constants';

export function item(state = {}, action) {
    switch (action.type) {
        case itemConstants.ITEM_OBTENIDO:
            // remove deleted user from state
            console.log('Action: ', action)
            return {
                ...state,
                ...action.item
            };
        case itemConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const {deleting, ...userCopy} = user;
                        // return copy of user with 'deleteError:[error]' property
                        return {...userCopy, deleteError: action.error};
                    }

                    return user;
                })
            };
        default:
            return state
    }
}
