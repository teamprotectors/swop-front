var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                loader: 'css-loader',
                options: {
                    modules: true,
                },
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://product-catalog-http-svc-dev-giovannysissa.cloud.okteto.net',
            apiCartUrl: 'https://swop-cart-http-svc-dev-giovannysissa.cloud.okteto.net',
            apiUserUrl: 'https://users-http-svc-dev-giovannysissa.cloud.okteto.net'
        })
    }
}
