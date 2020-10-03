/*
 * @Author: zhangguohua
 * @Date: 2020-10-03 11:22:02
 * @Description: 响应式系统工具集
 */

import { reactive, toRefs, watchEffect, isRef, ref, isReactive, isProxy, customRef, markRaw, shallowRef, toRaw } from "vue"

export function tools1 (foo) {
    console.group('响应式系统工具集')
    // unref: 语法糖， val = isRef(val) ? val.value : val
    // Ts 声明

    // toRef: 将一个 reactive 的对象的属性创建 ref, ref 可以被传递并能保持响应性
    console.log('传入的 props 属性值', foo)
    watchEffect(() => {
        console.log('被监听的 props.fool', foo.value)
    })
    // 不能操作 props
    foo.value++


    // watchEffect 如果传入一个不是 reactive, 将不会被监听。
    const obj1 = {
        a: 1
    }
    watchEffect(() => {
        console.log('不会被监听的普通对象', obj1.a)
    })
    obj1.a++

    // ToRefs: 把一个响应式对象，转换为普通对象，每个属性都是一个ref。
    const torefs1 = reactive({
        a: 1,
        b: 2
    })
    setTimeout(() => {
        torefs1.a++
    }, 10)

    const ref1 = ref(1)

    // 几个判断值， isRef, isReactive, isReadonly
    // isRef: 必须是 ref, reactive 不行
    console.log('必须是 ref, reactive 不行', isRef(torefs1), isRef(ref1), isReactive(torefs1))
    console.log('isProxy 检查 ref', isProxy(torefs1), isProxy(ref1))
    // isProxy: 检查一个对象是否是由 reactive/readOnly 创建的代理。

    console.groupEnd()


    return toRefs(torefs1)
}


// 高级响应式 api
export function seniorApi () {
    console.group('高级响应式 api')
    // customRef: 自定义一个 ref, 显示的控制依赖追踪和触发响应，接受一个工厂函数，两个参数分别是用于追踪的 track 与用于触发响应的 trigger，并返回一个带有 get 和 set 属性的对象。
    // 实现防抖的 v-model
    function useDebouncedRef (value, delay = 200) {
        let timeout
        return customRef((track, trigger) => {
            return {
                get () {
                    track()
                    return value
                },
                set (newValue) {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        value = newValue
                        console.log(value)
                        trigger()
                    }, delay)
                }
            }
        })
    }

    // markRow/shallow一族 允许你可选择性的覆盖 reactive/readonly 默认'深层的'特性，或者使用无代理的普通对象。
    // 浅层读取的设计： 
    // 1. 在该用 Proxy 的时候用，不过度使用，带来性能提升。 数据量庞大，但不可变时。
    // 2. 一些值的使用是简单的，那么他也不需要，比如： 第三方类库的实例，或者 vue 组件对象。
    // 这种特性，并不包括属性，只停留在根级别，所以，markRow 的属性仍然可以被设置为 reactive,在访问时，又会得到一个 代理对象。代理对象与原始对象并不相等，那么会产生标示混淆。
    const markRaw2 = markRaw({
        a: {}
    })
    const reactive1 = reactive({
        a: markRaw2.a
    })
    console.log('代理版本，与原始对象，并不在同一个地址', markRaw2.a === reactive1.a)

    // markRow: 显式标记一个对象为“永远不会转为响应式代理”，函数返回这个对象本身。
    // 标记后，即使在用 reactive， 或者将其作为响应对象属性，也依然不是响应式。
    const markRaw1 = markRaw({
        a: 1
    })
    console.log(isReactive(reactive(markRaw1)))
    console.log(isReactive(reactive({markRaw1}).markRaw1))
    
    // shallowReactive: 只为某个对象的私有 (第一层) 属性创建浅层的响应式代理，不会对属性的属性，做深层，递归的响应代理。
    // 自有，对象的属性，并不是 reactive.

    // shallowReadonly: 第一层浅读。
    // shallowRef: 会跟踪 .value 更改操作，同样，并不会对变更后的 .value 做响应式代理转换（即变更不会调用 reactive）
    
    // ref 对象会调用 reactive，还能使用.value, 那么是不是 reactive 就能直接使用 .value
    // 说明： 不仅仅是调用 reactive,还是会进行包装。
    // 仔细想想， ref 监听的是代理的 attr, 所以attr 的嵌套属性，是属性 shallowRef 监听的。
    // 那我们最好还是, 对象用 reactive, 基础数据类型用 ref.
    const reactive2 = reactive({
        a: 1
    })
    const ref1 = ref({
        a: 1
    })
    console.log('ref 调用 reactive 的包装测试', reactive2.value, ref1.value)
    const shallowRef1 = shallowRef({
        a: 1
    })
    watchEffect(() => [
        console.log('reactive可以修改属性， 是响应式的', reactive2.a)
    ])
    watchEffect(() => {
        console.log('shallowRef1 是响应式的，但属性不是', shallowRef1.value)
    })
    watchEffect(() => {
        console.log('ref 的属性是响应式的', ref1.value.a)
    })
    // 不会触发监听
    shallowRef1.value.a++
    shallowRef1.value = {}
    reactive2.a++
    ref1.value.a++
    
    // toRaw: 那么就回来了，设计一个 api, 产生了代理对象，怎么从代理对象读回去。就是这个了。返回原始普通对象。
    // 作用：还原对象，临时读取，访问不会被跟踪。写入不会触发响应。
    // 不建议持有： 因为会造成响应式盲点。也不建议对原始对象一直持有。
    // 谨慎使用。
    // 问题： 1. ref 是否也可读。如果传入对象时，应该是一样的。 ref 就可以看作 reactive 的包装。
    const obj2 = {
        a: 1
    }
    const ref2 = ref(obj2)
    watchEffect(() => {
        console.log(ref2.value.a)
    })
    ref2.value.a++
    const toRaw1 = toRaw(ref2.value)
    toRaw.a++
    console.log('toRaw, 返回原始对象', obj2 === toRaw1)


    console.groupEnd()
    return {
        text: useDebouncedRef('hello')
    }
}