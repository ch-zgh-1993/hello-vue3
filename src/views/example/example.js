/*
 * @Author: zhangguohua
 * @Date: 2020-10-14 11:02:56
 * @Description: 例子逻辑
 */
import { ref, reactive, watch, watchEffect, readonly, computed } from 'vue'


export function paramFun () {
    console.group('params---------')
    
    console.log('this, props, context.attrs, emit, slots, refs')
    console.log(arguments)

    console.groupEnd()
}


export function reactiveFun(msg) {
    console.group('reactive---------')

    const obj1 = {
        a: {
            b: {
                c: 1
            }
        }
    }
    
    const ref1 = ref(1)
    const ref2 = ref(0)

    const reactiveObj1 = reactive(obj1)

    watchEffect(() => {
        console.log(reactiveObj1.a.b)
    })

    setTimeout(() => {
        // console.log(reactiveObj1.a.b.c)
        reactiveObj1.a.b = true
    }, 100)
    
    watchEffect(() => {
        //
        console.log('props', msg.value)
    }, {
        flush: 'post', // 默认在 mounted 前执行。  sync 可以同步执行， pre 可以在组件更新前执行。 
        onTrigger () {
            console.count('trigger 执行')
        },
        onTrack () {
            console.count('onTrack 执行')
        }
    })
    
    let compute1 = computed({
        get () {
            return 'i am ref: ' + ref1.value
        },
        set (val) {
            ref1.value = val
        }
    })

    const stop = watch([ref2, ref1], ([ref2, ref1], [oldRef2, oldRef1]) => {
        console.log('侦听多个数据源', ref2, ref1, oldRef2, oldRef1)
    })
    setTimeout(() => {
        console.log(compute1.value)
        compute1 = 10
        console.log(compute1)
        ref2.value = 10
    }, 100)
    setTimeout(() => {
        stop()
        // stop
    }, 150)

    setTimeout(() => {
        ref2.value = 100
    }, 200)

    let custom1 = {
        a: 'b'
    }

    let readonly1 = readonly(reactive(custom1))

    readonly1.a = 2

    console.log(readonly1)


    console.log(ref, watch, readonly, computed)

    console.groupEnd()

    return {
        
    }
}