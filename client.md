# BLOG冲！

## 布局--响应式

### Header方案

* 当屏幕小于768px时，头部宽度变成100%
* 并且将搜索框隐藏，显示菜单图标和搜索按钮(独立于搜索框的)

### 小吊灯方案

* 父组件中为其绑定事件更换背景颜色
* 吊灯中触发事件更换背景颜色即可，无需在吊灯中操作store

* 吊灯的绳子是一个div
  * 利用伪元素做一个三角，通过设置宽度可以让三角上面的尖尖去掉
  * 给绳子添加震荡动画，动画是中间快两边慢的ease-in-out
* 两个单选input，不被选中的移动到最上面隐藏起来即可
  * 用到相邻兄弟选择器`+`
  * 用到后者选择器`~`
* 真正的灯泡是lable，上面两个input是用来加大点击范围的
  * 通过`~`利用选择的input来控制灯泡
    * 当当前选择的是`off`时，说明当前灯是关的，只要为lable设置相应样式即可(阴影)
    * 反之亦然
    * 用到`~`

### 中间模块的制作

* 通过路由，注意文章的背景颜色应该是store里面的颜色，因为要关灯的



### 标签页方案

* 给标签分4个等级，不同的等级对应不同的颜色和字体大小，最终的字体大小和颜色由标签对应的文章数决定


## 配置各种



### 难点

* **遇到包版本冲突**

  vuex版本太高，vue2跟不上，要指定版本

* **transition相关**

  * transition属性要初始化，不然第一次没效果

    当界面小于768px时，初始化left即可，因为刚开始是不方便得,fixed相对于浏览器定位
  
* **两次时相同的路由会报错**

  重写一下push，捕获异常即可

  ```js
  const routerPush = VueRouter.prototype.push
  VueRouter.prototype.push=function push(location){
      return routerPush.call(this,location).catch(error=>error)
  }
  ```

  

* **详细文章中组件复用路由不刷新问题**

  * 使用watch监视路由的变化
  * 路由变化时调用getDetail重新获取文章

* **评论模块**

  当用户点击ctrl+enter再发送

  ```js
   `@keydown.enter.native="publish"`
  
  publish(e){
    // 注意监听的是keydwom事件。如果监听keyUp,那么发送的时候换行也有了
      if(e.ctrlKey&& e.keyCode == 13){
          console.log('发布评论')
      }
  }
  ```


* **评论回复模块**

  * 点击回复按钮的时候，要根据当前回复对象设置show的`comment_id`和`reply_id`，并在相应的位置打开输入框
  * 评论和回复调用同一接口，后端只要判断有没有reply_id即可判断是评论还是回复


* **插入一条评论后，是否应该将评论立即插入到前端数组末尾的问题**

  * 如果之前已经到底了，直接将该评论插入前端评论的最后面即可,不用改变count，这样能保证前端不会再像后端获取了，也就不会出现重复评论问题
  * 如果评论之前评论尚未全部加载完毕，那么什么都不用管，当再次获取评论的时候会更新count

  




* **点击回复的时候获取焦点**

  * 只设置autofocus是不行的，只会生效一次
  * 通过$refs来调用其focus方法
  * 一定要注意，$refs获得的并不是el-input，$refs[0]才是！因为同时绑定了两个一样的ref，如果不一样就不用加下标
  * 分析了好久，粗心了
  * 注意是在nextTick
  * 还有一种办法就是绑定自定义事件在其insert的时候获取，但是试了好像没用

* **评论点赞后评论重载问题**

  * 点赞后，后端返回点赞状态
  * 根据点赞状态对该评论的点赞数进行修改，而不是重新获取点赞数据
  * 函数传的参数是引用，**直接修改即可(就非常的nice)**
  * 关于颜色，也可以直接将用户id从点赞列表中删除，(修改数据会调用diff的，只不过没有改变的不会刷新罢了，其实都有比较，而不是只在修改的地方比较)

* element组件也是组件，原生样式要native

* 由分类到达列表页的时候，因为切换了组件，所以用路由传参会好一点

  在article组件监听路由的变化更换查询查询方式

  ```js
  this.$router.push({name:'article',params:{cat_name:cat_name}})
  ```


* 可以对表单的部分字段进行校验

  但是在部分校验的时候，有多少个校验字段，回调函数就会执行多少次，所以不要在里面请求，而是用try，如果校验不成功，则不请求
  
* **表单中通过`ifram`嵌入网易云音乐是一个难点**

  1. 需要通过js修改ifram内部样式


### 优点

* **按需引入element-ui**

  * 在bable.config.js中配置，不然就会没有用（按官网来）

    ```js
    plugin:[
        // 配置element-ui
        [
          "compoent",
          {
            libraryName:"element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    ```

* **使用缓存解决vuex持久性问题**

  编写getter，从缓存中获取登录状态和用户信息
  
* **路由懒加载**

* **列表懒加载**

  1. 添加进度条事件，当页面倒最下方的时候，调用请求函数
  2. 注意，添加节流是给执行的函数添加节流，而不是给回调函数，否则，可能永远不会发送请求，因为给回调函数节流时，要命中进度条倒最下方并且调用了回调函数这一时刻，但是，实际情况是很难的。所以做法是不停回调，只对在回调中执行的目标函数节流
  2. 另外，这里不用节流。用防抖，因为即使是给执行的函数添加节流，也会有发不出的情况，但是给回调函数添加防抖就不会有这种情况，所以防抖加给**回调函数**
  3. `Document.documentElement` 是一个会返回文档对象（[`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)）的根[`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)的只读属性（如HTML文档的 `html`元素）
  4. `document.compatMode`表明当前文档的渲染模式是[怪异模式/混杂模式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)还是标准模式
     * 怪异模式，浏览器使用自己的方式解析渲染页面，在不同的浏览器就会显示不同的样式。
     * 标准模式，浏览器使用W3C的标准解析渲染页面。
     * 通过 document.compatMode 的值可以知道当前用的是什么模式
       * BackCompat：怪异模式
       * CSS1Compat：标准模式

  ```js
  // 引入节流函数
  import { debounce } from "./debounce";
  // 为滚动到最低端添加事件
  let scollMore = function (fun) {
    // 防止立即调用
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴滚动距离
    let vh =
      document.compatMode === "CSS1Compat"
        ? document.documentElement.clientHeight
        : document.body.clientHeight; // 页面的可视高度
  
    // 取最小值，不然有可能拉不出来
    let allHeight = Math.min(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ); // 页面的总高度
    console.log(scrollY, vh, allHeight);
    // 向上取整，不然有可能拉不出来
    if (Math.ceil(scrollY + vh) >= allHeight) {
      console.log("bbb");
      fun();
    }
  };
  
  let callback;
  // 暴露添加事件
  let addScollEvent = function (fn, delay = 200) {
    // 定义函数，可以传参并且能销毁回调
    callback = debounce(function () {
      scollMore(fn);
    }, delay);
    window.addEventListener("scroll", callback);
  };
  
  // 删除事件,在离开组件的时候及时删除
  let deleteScollEvent = function () {
    window.removeEventListener("scroll", callback);
  };
  export { addScollEvent, deleteScollEvent };
  
  ```
  

6. 关于发送验证码

   * 前端点击发送验证码的时候，使用localstorage存放时间戳，防止用户刷新后继续发送验证码
* 然后在mounted的时候检查localstorage判断是否还在计时
   * 前端只有在书信localstorage1s内刷新页面，才能清除计时
* 当然后端也是需要判断的，因为用户可以刷新localstorage
7. 各种防抖处理



### 状态管理

* userInfo和loginStatus

  > 储存用户信息

  * 如果状态中有，就获取状态中
  * 如果状态中没有，就获取localStorage的

* backgroundColor和bgColor和fontColor

  > 储存背景颜色

  * backgroundColor控制背景状态
  * bgColor为对应的背景颜色
  * fontColor为对应字体颜色
  * 可以通过计算属性监视backgroundColor，从而更换背景颜色和字体颜色以及使用不同的背景图片
  
* 将store里面的内容存在localstore中缓存，防止刷新丢失



### 关于xiaos的使用

* **启用响应拦截器**
  * 2xx会进入第一个回调
  * 其他会进入第二个回调
    * error.response.status判断状态码，如果是401则让登录
  * 在调用请求的地方catch,因为所有非200都变成了reject,await碰到reject会抛出异常，此时弹窗错误信息，所以在请求的地方就不用判断200了
  * 在拦截器里面，截取错误信息，如果返回的msg是空，那么证明请求没有发送成功，则reject(网络错误)，否则reject(msg),在请求处根据自己的需要自行打印reject结果

* **启用请求拦截器**

  在请求拦截器中将所有请求带上有的token

### 其他

* 用了过滤器

  





### 获取文章逻辑

* 点击首页时

  将所有搜索条件初始化

* 按搜索搜索关键字文章逻辑

  1. 搜索组件传送搜索的值到文章列表组件
  2. 文章列表将`isCategory`和`isTag`设置为false
  3. 将搜索对象中的category和tag设置为false
  4. 将`isSearch`设置为true，并将page设置为1
  5. 当换页的时候，直接在文章列表组件换页即可



### 登录逻辑

* 表单验证通过后，发送请求

* 对登录方法进行节流

* 登录成功后，将用户信息，登陆状态，token提交到store

* store中将这些信息保存到本地储存

* 将本地储存中控制验证码时间的字段删除

* 定时返回上一级路由

  this.$router.back()


### 接口规范

* 获取文章接口

  * 接口功能

    本接口用于获取文章列表

  * 请求地址

    ```js
    
    ```

  * 请求方式

    ```
    GET
    ```

  * 请求参数

    | 字段名      | 字段说明   | 字段类型 | 是否必填 |
    | ----------- | ---------- | -------- | -------- |
    | page        | 当前的页数 | int      | 否       |
    | pageSize    | 每页的大小 | int      | 是       |
    | searchValue | 搜索关键字 | int      | 否       |
    |             |            |          |          |



### 插件的使用

* vuex
* vue-Router
* mavon-editor





### 关于element-ui

* **el-mune的使用**

  * 使用el-menu时，可以通过`el-menu`中的`:default-active=""`来指定当当前`index`为几的`el-menu-item`高亮

  * 只要检测一下路由的变化，再做个映射就行了
