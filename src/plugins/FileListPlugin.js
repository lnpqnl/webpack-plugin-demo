class FileListPlugin {
    constructor(options) {

    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
            let filelist = 'In this build:\n\n';
            // 遍历所有编译过的资源文件，
            // 对于每个文件名称，都添加一行内容。
            for(let filename in compilation.assets){
                filelist += "-" + filename + "\n";
            }
            compilation.assets['filelist.md'] = {
                source: () => filelist,
                size: () => filelist.length
            }
            cb();
        })
    }
}


module.exports = FileListPlugin;