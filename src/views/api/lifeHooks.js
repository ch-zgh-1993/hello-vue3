/*
 * @Author: zhangguohua
 * @Date: 2020-09-30 17:26:18
 * @Description: 生命周期钩子, 依赖注入
 */

// 生命周期钩子只能在 setup 期间同步使用。 在生命周期内部调用的创建的侦听器和计算状态也会自动删除，在卸载组件时。
// beforeCreated/created = setup; 其他 = +on
// 新增： onRenderTracked, onRenderTriggered. DebuggerEvent.

import { onMounted } from 'vue'

export function mounted () {
    onMounted(() => {
        console.log('mounted!')
    })
}

// 依赖注入
// provide/inject