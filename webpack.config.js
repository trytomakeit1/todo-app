module.exports = {

    entry: './src/index.js',
    output: {
        path: __dirname + '/public' ,
        filename: 'bundle.js'

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{     
                        cacheDirectory: true
                    }
                }        
            },

            {
                test: /\.css$/,
                use:{
                    loader: 'style-loader'
                }
            },
            {
                test: /\.css$/,
                use:{
                    loader: 'css-loader'
                }
            }
            
        ]
    },

    devServer: {
        port: 3000,
        contentBase: './public',
        inline: true /* automatically updates live code */
    }
}