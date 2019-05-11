# 模拟vue, 实现了一个最简单的响应式.
# 支持的功能有:
- 指令: i-text, i-html, i-model
- 事件绑定: @click,...

# 项目结构介绍
框架的代码放在src目录下.
1. ivue.js: 初始化变量, 设置data响应, 代理data到vm实例上.
2. dep.js： 依赖管理器. 保存依赖, 通知依赖更新.
3. watcher.js: 
4. compiler.js: 编译节点, 搜集依赖.

# 关系图
![vue关系图](vue关系图.png)