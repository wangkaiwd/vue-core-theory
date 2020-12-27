## 模板编译

[`html`解析成`ast`语法树](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) ：

* 是否有`el`选项？没有会调用`vm.$mount(el)`，这里的`el`是自己传入的
* 是否`template`选项？
  * 有的话，将`template`编译为`render`函数
  * 没有，将`el.outerHTML`做为`template`编译为`render`函数

核心：如何将`template`转换为`render`函数

* 利用正则对字符串进行匹配，得到`ast`语法树
* `ast`语法树 -> code
* new Function + with: code -> render
* 虚拟结点 -> 真实节点