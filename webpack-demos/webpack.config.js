const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const util = require('./static/js/util.js')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = app ={
    // entry:{
    //     detail:path.resolve(rootURl,'detail/detail.js'),
    //     shouye:path.resolve(rootURl,'shouye/shouye.js'),
    // },
    entry:util.entrys,
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist/',
        filename: "[name]-[hash].js",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(htm|html)$/i,
                loader: 'html-loader'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-html-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit:10000
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        port:8025,
        publicPath:'/',
        host:'localhost',
        hot:true,
        inline:true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
          dry:false
      }),
      new cleanWebpackPlugin()
    ]
  }
//读取html文件，生成多个html,并把对应的js插入对应页面
let pages = util.pages
for (var page in pages) {
    let conf = {
        //输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
        filename: 'templates/'+page + '[hash].html',
        //本地模板文件的位置
        template: 'html-loader!'+pages[page],
        // /**
        //  * 向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
        //  * true或者body：所有JavaScript资源插入到body元素的底部
        //  * head：所有JavaScript资源插入到head元素中
        //  * false：所有静态资源css和JavaScript都不会注入到模板文件中
        //  */
        inject: true,
        //按chunks的顺序对js进行引入
        chunkSortMode: 'dependency',
        // /**
        //  * true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
        //  * 例如：<script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
        //  */
        hash: true,
        minify: {
            //剥离HTML注释
            removeComments: true,
            //尽可能删除属性的引号
            removeAttributeQuotes: false,
            //折叠对文档树中的文本节点有贡献的空白空间
            collapseWhitespace: false
        },
        chunks:pages[page],
    }
    app.plugins.push(new HtmlWebpackPlugin(conf))
}

