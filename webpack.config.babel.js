export default {
    entry: {
        'app': __dirname + '/modules/src/script/main.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    output: {
        path: __dirname + '/modules/dist/js',
        filename: '[name].js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'vue-loader']
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        alias: {
           vue: 'vue/dist/vue'
        },
        extensions: ['*', '.js', '.vue']
    }
}
