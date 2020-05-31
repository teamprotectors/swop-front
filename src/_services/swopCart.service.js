import config from 'config';

export const swopCartService = {
    register, sendSwopCart, getItemsStock
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

    return fetch(`${config.apiCartUrl}/cart`, requestOptions).then(handleResponseSwop);
}

function handleResponseSwop(responseSwop) {
    return responseSwop.text().then(text => {
        const data = text && JSON.parse(text);
        if (!responseSwop.ok) {
            if (responseSwop.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || responseSwop.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getItemsStock() {
    return fetch(`${config.apiUrl}/products`)
        .then(item => item.json())
        .then(data => {
            localStorage.setItem('getItems', JSON.stringify(data))
            return data;
        });
}
