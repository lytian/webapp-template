# webapp-template

> 基于Vue全家桶的webapp项目模板。基础模板是[vue-templates/webpack](https://github.com/vuejs-templates/webpack)，处理了一些移动端APP的兼容性，扩展了对axios的封装等。

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
  - 基于[mint-ui](http://mint-ui.github.io)的页面框架
  - 一些页面适配处理
  - dom操作、native交互、本地化存储等一些工具类封装
  - 一些兼容性处理

## 扩展说明

### 基础样式
  在assets/stylus文件夹下面对样式有一些基础设置

  - base.styl 一些基础样式的设置，比如：纵向滚动、横向滚动、隐藏滚动条、浮动页面等
  - icon.styl 字体图标
  - mixin.styl 混合样式。比如：超出显示省略号、扩展点击等
  - reset.styl 重置的一些样式。比如：mint-ui的一些样式、自定义的一些样式
  - variable.styl 全局样式变量。包括字体大小、样色、边距等

  **后面会考虑增加Android的一些px单位兼容处理**

### 工具方法
  在assets/js文件夹下面

  - brower.js 浏览器一些自身属性的判断。
  - dom.js dom操作的方法封装
  - local.js 本地数据缓存。比如用户信息、搜索记录
  - mixins.js Vue的mixin的集合
  - native.js 与Android、IOS原生交互处理集合
  - utils.js 工具类。比如时间格式化、拟人化、随机字符串等

### axiosApi 
  > Promise封装、网路请求的参数处理、后台返回的接口处理、报错提示处理
  
  已经在main.js中引用，可通过this.$http使用
  ``` js
    this.$http.post('/login', {
      account: 'admin',
      password: 123456
    }).then(() => {
      Toast('登录成功')
    })
  ```
### 需要注意的地方

  ```js
    import { on } from 'assets/js/dom'
    
    // mint-ui与fast-click的兼容
    on(this.$refs.scrollBox, 'touchstart', function(event) {
      event.target.classList.add('needsclick')
    })
  ```