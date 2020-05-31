import config from 'config';

export const swopCartService = {
    register, sendSwopCart
};

function register() {
    return fetch(`${config.apiUrl}/products`)
        .then(item => item.json())
        .then(data => {
            localStorage.setItem('item', JSON.stringify(data))
        return data;
        });
}

function sendSwopCart(swopCart) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swopCart)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}
