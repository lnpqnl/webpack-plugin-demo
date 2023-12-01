class LifePlugin {
  // 构造函数
  constructor(options) {
    console.log("new");
    this.options = options;
  }
  // 入口函数
  apply(compiler) {
    // 在Webpack的环境准备好之后执行
    compiler.hooks.environment.tap("MyWebpackPlugin", () => {
      console.log("environment hook");
    });

    // 在Webpack开始执行之前执行
    compiler.hooks.initialize.tap("MyWebpackPlugin", () => {
      console.log("initialize hook");
    });

    // 在新的编译(compilation)创建之前执行
    compiler.hooks.beforeCompile.tapAsync(
      "MyWebpackPlugin",
      (params, callback) => {
        console.log("beforeCompile hook");
        callback();
      }
    );

    // 编译(compilation)创建之后执行
    compiler.hooks.compile.tap("MyWebpackPlugin", (params) => {
      console.log("compile hook");
    });

    compiler.hooks.compilation.tap('MyWebpackPlugin', (compilation) => {
      console.log("compilation hook");
    })

    // 生成资源到 output 目录之前执行
    compiler.hooks.emit.tapAsync("MyWebpackPlugin", (compilation, callback) => {
      console.log("emit hook");
      compilation.hooks.processAssets.tapAsync(
        {
          name: "MyWebpackPlugin",
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets, cb) => {
          console.log("Assets are being processed");
          cb();
        }
      );
      callback();
    });

    // 在编译(compilation)完成后执行
    compiler.hooks.done.tap("MyWebpackPlugin", (stats) => {
      console.log("done hook");
    });
  }
}

module.exports = LifePlugin;
