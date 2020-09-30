/*
 * @Author: zhangguohua
 * @Date: 2020-09-22 13:06:08
 * @Description: 直接执行测试的 api
 */
import { reactive, watchEffect, readonly } from 'vue'


// watch 与 watchEffect 的区别
// watch 需要指定属性，而 watchEffect 不需要指定，会自动收集回调中的响应式属性。
// watchEffect 拿不到旧值
// 在初始化时， watchEffect 就需要执行一次，收集依赖同 computed. 后续依赖变化会再次执行回调。


// 优势，可以停止，可以传入回调 onInvalidate 在重新运行或者停止时，取消异步的方法。
// watch: 懒执行，明确属性，访问变化前后的值。 === $watch, watch 选项。 可以侦听多个数据源。 数组。 在停止侦听，清理异步，刷新，调试表现一致。
// 什么时候刷新？ 同样在一次循环中运行一次，组件的 update 也会被侦听， watchEffect 会在所有组件的 update 后执行。 

export function readonlyF () {
    const original = reactive({
        count: 0
    })

    // 传入对象或者 ref, 返回一个只读的代理，是深层的，所有属性。
    const copy = readonly(original)

    // 会立即执行函数，并响应式的追踪，在依赖变更时继续执行， 在组件卸载时自动停止。也可以显示停止
    // stop = watchEffect(); stop()
    watchEffect(() => {
        // 依赖追踪
        console.log(copy.count)
    }, {
        flush: 'pre', // post: 在组件更新前触发， sync: 同步， 
        // 侦听器调试, 仅在开发模式下生效
        onTrack () {
            console.log('被侦听')
        },
        onTrigger () {
            console.log('依赖变更')
        }
    })

    // 触发 copy 的监听
    original.count++
    original.count++

    // 无法修改 copy, 会触发警告，且不会对值进行修改
    copy.count++



    // 
}