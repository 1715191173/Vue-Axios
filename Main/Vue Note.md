# Vue 全家桶笔记

#### Vue指令系统 (v-...)

1. **v-text** 和 **v-html** 跟 **{{}}** 同一个道理，但是v-html会转化成HTML超文本语言

2. 显示和隐藏 **v-if v-else-if v-else** 赋值true为显示，反之亦然。真正的显示隐藏
   **v-show** 基于样式display: none | block

3. 事件 **v-on:事件名** 简写为 **@click**

4. 绑定 **v-bind:** 简写为 **:**

   - 绑定class属性 => :class='{{active: isActive}}'
   - 绑定titile属性=> :title='title'

5. 循环(操作) **v-for**

   ```vue
   <ul v-if='menus && menus.length > 0'>
       <li v-for='(item, i) in menus'>
       	<h2>
               {{item.name}}
           </h2>
       </li>
   </ul>
   
   const vm = new Vue({
   	el: "#app",
   	data:{
   		menus: [
   			{
   				key: 1,
   				name: 'Alan'
   			}
   		]
   	}
   })
   ```

   当有v-for时候，最好再绑定**key**属性 **:key='item.id'**，如果没有数据没有id属性那就不需要绑定，在有id属性情况下，可以虚拟DOM渲染效率。

6. 表单输入绑定 => 双向数据绑定 **v-model=' '** 或 **v-model.lazy=' '** 
   实质上是v-bind: 和 @input的一个语法糖(组合) 
   
7. 获取DOM的方法：绑定ref
   在元素中绑定 **ref='box'**
   Vue源码的方法中 **this.$refs.box[i]** 即可追踪并操作该DOM元素

#### 数组和对象的更新检测方式

当发现更新数组时发现Vue没有实时渲染则可以使用以下方法解决

```vue
// 添加单个属性
this.$set(this.someObject, 'a', 2)

// 添加多个属性
this.obj = Object.assign({}, this.obj, {age: 18, fav: "Game"})

// 修改值
Object.splice(.)
```

#### 生命周期函数

created 

watch

#### 脚手架vue-cli

1. 安装node
2. cnpm i -g @vue/cli

3. 创建3.0版本项目 vue create <项目名>

4. 运行 vue npm run serve

​	