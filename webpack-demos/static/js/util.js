var path = require('path')
var glob = require('glob')
// /**
//  * 读取指定路径下的文件
//  * @param {String} glob 表达式
//  * @param {String} base 基础路径
//  */
 const getEntries = function (globPath, base, replaceed) {
    var entries = {}
    glob.sync(globPath).forEach(function (entry) {
        console.log(entry)
        //获取对应文件的名称
        var moduleName = entry.match(/(\w+).\w+$/)[1];
        if (base) {
            // console.log(base)
            let temp = path.relative(base, entry)
            // console.log(temp)
            moduleName = temp.replace(path.extname(entry), '')
            var entryName = moduleName.split('/')[moduleName.split('/').length-1];
        }
        // //moduleName 去掉第一次出现的replaceed字符串，并去掉所有‘\’
        // if (replaceed) {
        //     let idx = moduleName.indexOf(replaceed)
        //     if (idx >= 0) {
        //         let pre = moduleName.substring(0, idx)
        //         let after = moduleName.substring(idx + replaceed.length).replace(/^[\\\/]*/, '')
        //         moduleName = pre + after
        //     }
        // }
        //对象key中，‘\’替换成‘/’,以便插入的代码路径是‘/’
        moduleName = moduleName.replace(/\\/g, "\/");
        // console.log(moduleName + 1)
        entries[entryName] = entry
    })

    return entries;
}



const ROOT_PATH = path.resolve(__dirname);
//要打包的源代码路径
const RESOURCES_PATH = path.resolve(ROOT_PATH, '../../src');

//设置要打包的js文件为入口文件
exports.entrys = getEntries(path.join(RESOURCES_PATH, 'pages/**/*.js'), path.join(RESOURCES_PATH, 'pages/**/*.js'));
exports.pages = getEntries(path.join(RESOURCES_PATH, '/pages/**/*.ejs'), path.join(RESOURCES_PATH,'/pages'));
