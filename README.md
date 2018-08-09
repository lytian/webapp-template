# webapp-template

> 基于Vue全家桶的webapp项目模板。基础模板是[vue-templates/webpack](https://github.com/vuejs-templates/webpack)，扩展了对axios的封装，

## 用法

这个项目模板依赖于[vincent-cli](https://www.npmjs.com/)，vincent-cli是根据[中测信息技术有限公司](http://www.iwiteks.com)需求定制化的一个脚手架。

``` bash
$ npm install -g vincent-cli
$ vincent init webapp my-project
$ cd my-project
$ npm install
$ npm run dev
```

## 它包含了什么内容？

- `npm run dev`: 开发环境中
  - Webpack + `vue-loader` 开发单页面项目.
  - 热加载
  - 编译错误覆盖
  - ESLint热检测
  - src源文件
  - 强制使用eslint的standard风格

- `npm run build`: 构建打包项目
  - 用[UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony)压缩JavaScript
  - 用[html-minifier](https://github.com/kangax/html-minifier)压缩HTML
  - 用[cssnano](https://github.com/ben-eb/cssnano)提取css到单个文件中，并将其缩小
  - 以hash模式编译静态资源，用于长效的保存，并生成对应的
  - `npm run build --report`使用bundle大小分析算法构建
  - axios的针对性封装
  - 基础css重置
  - 通用class封装
  - 使用stylus全局变量、方法封装。可以做主题定制化等
  - 基于mint-ui的页面框架
  - 一些页面适配处理
  - dom操作、native交互、本地化存储等一些工具类封装
