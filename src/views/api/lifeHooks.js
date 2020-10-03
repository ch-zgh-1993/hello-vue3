/*
 * @Author: zhangguohua
 * @Date: 2020-09-30 17:26:18
 * @Description: 生命周期钩子, 依赖注入
 */

// 生命周期钩子只能在 setup 期间同步使用。 在生命周期内部调用的创建的侦听器和计算状态也会自动删除，在卸载组件时。
// beforeCreated/created = setup; 其他 = +on
// 新增： onRenderTracked, onRenderTriggered. DebuggerEvent.

import { onMounted, ref } from 'vue'

export function mounted () {
    onMounted(() => {
        console.log('mounted!')
    })
}

// 依赖注入
// provide/inject 
// 


// Refs === template refs
// 将 root 暴露在渲染上下文中，通过 ref='' 进行绑定。在 DOM patch 算法中，在 vritual DOM 的 mount/patch 中执行。所以仅在渲染后才可以访问。
//  ref 是响应式的，可以传递组合函数，或者从中返回。
// 

export function refFun () {
    const root = ref(null)

    onMounted(() => {
        console.log(root.value)
    })

    return {
        root
    }
}