# svg 文件打包为 css/wxss

## npm 安装
```npm i svg2wxss``` 或 ```yarn add svg2wxss```

1. 创建svgs、dist目录
2. 将需要打包的svg文件放入svgs目录中 
3. 代码
### node
```js
var svg2wxss = require("svg2wxss").default;
var path = require("path");
svg2wxss({
    path:path.join(__dirname,"svgs"),
    out:{
        path:path.join(__dirname,"dist"),
        css:true,
        wxss:true,
        index:true
    }
})
```
### ES2016
```js
import svg2wxss from "svg2wxss"
let path = require("path");
svg2wxss({
    path:path.join(__dirname,"svgs"),
    out:{
        path:path.join(__dirname,"dist"),
        css:true,
        wxss:true,
        index:true
    }
})
```
### Typescript
```js
import svg2wxss,{option} from "svg2wxss"
let path = require("path");
svg2wxss({
    path:path.join(__dirname,"svgs"),
    out:{
        path:path.join(__dirname,"dist"),
        css:true,
        wxss:true,
        index:true
    }
})
```
### 参数说明
```
{
    path:string, //svg 目录
    out?:{
        path?:string, // 编译输出路径 默认为svg路径
        css?:boolean, // 输出css 默认：true
        wxss?:boolean, // 输出wxss 默认：true
        html?:boolean, // 输出html 默认：true
    }
}
```

## 开发环境
```git clone```

1. 安装环境 ```npm i```
2. 拷贝svg文件至test/svgs/
2. 执行编译 ```npm run test```
3. 打开 test/dist/index.html 看效果





