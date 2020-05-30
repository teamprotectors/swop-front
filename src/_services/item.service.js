import config from 'config';

export const itemService = {
    register,
};

function register() {
    return fetch(`${config.apiUrl}/products`)
        .then(item => item.json())
        .then(data => {
            localStorage.setItem('item', JSON.stringify(data))
        return data;
        });
}
